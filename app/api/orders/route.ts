import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set in environment variables.")
}
const resend = new Resend(resendApiKey)

const orderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  quantity: z.string().min(1, "Quantity is required"),
  totalPrice: z.string().min(1, "Total price is required"),
  discount: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orderData = orderSchema.parse(body)

    // Save to Firestore
    const orderRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      quantity: Number.parseInt(orderData.quantity),
      totalPrice: Number.parseInt(orderData.totalPrice),
      discount: Number.parseInt(orderData.discount || "0"),
      status: "pending",
      createdAt: serverTimestamp(),
    })

    // Send admin notification email
    const adminEmail = process.env.ADMIN_EMAIL || "allthegoodthings14@gmail.com"
    const { error: adminError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [adminEmail],
      subject: "New SweepBot Pro Order Received",
      html: `
        <h2>New Order Notification</h2>
        <p><strong>Order ID:</strong> ${orderRef.id}</p>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}</li>
          <li><strong>Phone:</strong> ${orderData.phone}</li>
          <li><strong>WhatsApp:</strong> ${orderData.whatsapp}</li>
          <li><strong>Address:</strong> ${orderData.address}</li>
        </ul>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li><strong>Quantity:</strong> ${orderData.quantity} unit(s)</li>
          <li><strong>Total Price:</strong> GH₵${Number.parseInt(orderData.totalPrice).toLocaleString()}</li>
          <li><strong>Discount:</strong> GH₵${Number.parseInt(orderData.discount || "0").toLocaleString()}</li>
          <li><strong>Payment:</strong> Cash on Delivery</li>
          <li><strong>Order Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      `,
    })

    if (adminError) {
      console.error("Admin email sending error:", adminError)
    }

    return NextResponse.json({ success: true, orderId: orderRef.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }

    console.error("Order API error:", error)
    const message = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: "Internal server error", details: message }, { status: 500 })
  }
}
