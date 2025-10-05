"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Jennifer Wu",
    role: "Found her tribe",
    image: "/happy-asian-family-smiling.jpg",
    quote:
      "After leaving an abusive family, I thought I'd always be alone. New Family Tree helped me build a support system of 8 people who truly love me. I finally have the family I always dreamed of.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Single dad, chosen uncle",
    image: "/happy-black-african-family-smiling.jpg",
    quote:
      "As a single dad, I needed support. Through this platform, my kids now have 'aunts' and 'uncles' who show up for birthdays, help with homework, and are there when I need a break. We're not alone anymore.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "LGBTQ+ advocate",
    image: "/happy-multiracial-mixed-family-smiling.jpg",
    quote:
      "When my biological family rejected me for being gay, I was devastated. This community helped me find my chosen family - people who celebrate me for exactly who I am. I've never felt more loved.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    role: "Immigrant, community builder",
    image: "/happy-hispanic-latino-family-smiling.jpg",
    quote:
      "Moving to a new country, I left my entire family behind. New Family Tree connected me with others who understood my journey. Now I have a family dinner every Sunday with people who feel like home.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-4 font-display">Stories That Inspire</h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-body">
          Real people who found their chosen family and transformed their lives
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="card-luxury shadow-luxury border-2 border-yellow-600/20 overflow-hidden hover-lift"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400/30">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-100 font-display text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-yellow-400 font-body">{testimonial.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <Quote className="w-8 h-8 text-yellow-400/30" />
              </div>
              <p className="text-slate-300 leading-relaxed font-body italic">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 px-6 py-3 rounded-full border border-yellow-600/30">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-slate-100 font-bold">4.9/5</span>
          <span className="text-slate-400">from 10,000+ members</span>
        </div>
      </div>
    </div>
  )
}
