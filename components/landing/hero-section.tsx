import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Truck, RotateCcw } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium">
              AI-Powered Smart Navigation
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Clean Floors, <span className="text-primary">Zero Effort</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              SweepBot Pro uses advanced AI to map your home, navigate obstacles, and deliver a spotless clean every
              time. Just set it and forget it.
            </p>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">GH₵800</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">1 Unit</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-primary">GH₵1,450</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">2 Units</p>
                    <p className="text-xs font-medium text-primary">Save GH₵150</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-primary">GH₵2,000</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">3 Units</p>
                    <p className="text-xs font-medium text-primary">Save GH₵400</p>
                  </div>
                </div>
                <Button className="mt-4 w-full h-12 text-base font-semibold" size="lg" asChild>
                  <a href="#order">Order Now - Free Delivery</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>7-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5" />
            <img
              src="/modern-sleek-white-robot-vacuum-cleaner-sweeper-on.jpg"
              alt="SweepBot Pro Robot Sweeper"
              className="mx-auto h-auto w-full max-w-sm sm:max-w-md rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
