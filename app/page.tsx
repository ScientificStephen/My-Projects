"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Testimonials from "@/components/testimonials"
import { motion } from "framer-motion"

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/diverse-multiracial-families-smiling-together-mult.jpg"
            alt="Diverse families together"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold-gradient font-display">
              Build the Family You Love
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto font-body leading-relaxed">
              Because family isn't just who you're born to—it's who you choose. Connect with the people who truly
              matter, create lasting bonds, and build your chosen family tree.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold text-lg px-8 py-6 shadow-luxury"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-yellow-500/50 hover:bg-yellow-500/10 text-slate-100 font-bold text-lg px-8 py-6 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div>
              <div className="text-4xl font-bold text-gold-gradient mb-2">10K+</div>
              <div className="text-slate-400 font-body">Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-gradient mb-2">50K+</div>
              <div className="text-slate-400 font-body">Connections</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-gradient mb-2">4.9★</div>
              <div className="text-slate-400 font-body">Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient font-display">
              You're Not Alone in Feeling Alone
            </h2>
            <p className="text-xl text-slate-300 font-body leading-relaxed">
              Millions of people feel disconnected from their biological families. Whether due to distance, values,
              trauma, or life circumstances—you deserve a family that celebrates who you are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "LGBTQ+ Individuals",
                description: "Rejected by biological family? Build one that celebrates your authentic self.",
                icon: Heart,
              },
              {
                title: "Single Parents",
                description: "Need a support system? Find 'aunts,' 'uncles,' and co-parents who show up.",
                icon: Users,
              },
              {
                title: "Survivors",
                description: "Healing from toxic relationships? Create a family based on love, not obligation.",
                icon: Shield,
              },
              {
                title: "Immigrants & Expats",
                description: "Far from home? Connect with people who understand your journey and culture.",
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20 hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-slate-950" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100 font-display">{item.title}</h3>
                    <p className="text-slate-300 font-body leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient font-display">
              Everything You Need to Build Your Family
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-body">
              More than just a platform—it's a movement. Connect, share, and grow with the family you deserve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Visual Family Tree",
                description:
                  "Create a beautiful, interactive tree with chosen family members—aunts, uncles, siblings, or 'just family.'",
                image: "/asian-family-smiling-beach-vintage-photo-children.jpg",
              },
              {
                title: "Private & Group Messaging",
                description:
                  "Stay connected with 1-on-1 chats or family group conversations. Share daily moments securely.",
                image: "/hispanic-elderly-grandmother-smiling-birthday-cele.jpg",
              },
              {
                title: "Shared Memories",
                description:
                  "Upload photos, videos, and stories. Build a digital scrapbook of your chosen family's journey.",
                image: "/diverse-mixed-race-family-smiling-reunion-outdoors.jpg",
              },
              {
                title: "Family Events",
                description:
                  "Plan dinners, birthdays, or virtual hangouts. Coordinate schedules and never miss a celebration.",
                image: "/african-black-family-dinner-table-smiling-together.jpg",
              },
              {
                title: "Video Calls",
                description: "Face-to-face connection from anywhere. Host family calls with up to 12 people at once.",
                image: "/happy-asian-family-smiling.jpg",
              },
              {
                title: "Safe & Secure",
                description: "Your family, your privacy. End-to-end encryption and control who sees what you share.",
                image: "/happy-multiracial-mixed-family-smiling.jpg",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-luxury shadow-luxury overflow-hidden group hover-lift border-2 border-yellow-600/20">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-slate-100 font-display">{feature.title}</h3>
                    <p className="text-slate-300 font-body leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient font-display">
              Start Building Your Family in Minutes
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-body">
              Three simple steps to create the support system you've always wanted
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "Share who you are, what you value, and what kind of family connections you're seeking.",
              },
              {
                step: "2",
                title: "Find Your People",
                description:
                  "Browse profiles, send connection requests, and start conversations with potential family members.",
              },
              {
                step: "3",
                title: "Build Your Tree",
                description: "Add connections as family members, create groups, and watch your chosen family grow.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-3xl font-bold text-slate-950 mx-auto mb-6 shadow-luxury">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-100 font-display">{step.title}</h3>
                  <p className="text-slate-300 font-body leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-100 font-display">
              Join Thousands Building Their Chosen Families
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "10,000+", label: "Active Members", sublabel: "Building their families" },
                { number: "50,000+", label: "Connections Made", sublabel: "And growing daily" },
                { number: "1,000+", label: "Daily Messages", sublabel: "Staying connected" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20 hover-lift">
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl font-bold text-gold-gradient mb-2 font-display">{stat.number}</div>
                      <div className="text-xl font-semibold text-slate-100 mb-1 font-display">{stat.label}</div>
                      <div className="text-slate-400 font-body">{stat.sublabel}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/black-father-white-son-handshake-chosen-family.jpg"
            alt="Building chosen family"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900/95" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold-gradient font-display">
              Your Family Is Waiting
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-body leading-relaxed">
              Don't wait to build the support system you deserve. Start creating your chosen family today—it's free to
              begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold text-xl px-12 py-8 shadow-luxury"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["Free to Start", "No Credit Card", "Cancel Anytime", "100% Private"].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-center gap-2 text-slate-300 font-body"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-yellow-600/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gold-gradient mb-4 font-display">New Family Tree</h3>
              <p className="text-slate-400 font-body">Building the families we choose, together.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 mb-3 font-display">Product</h4>
              <ul className="space-y-2 text-slate-400 font-body">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 mb-3 font-display">Company</h4>
              <ul className="space-y-2 text-slate-400 font-body">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 mb-3 font-display">Legal</h4>
              <ul className="space-y-2 text-slate-400 font-body">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-yellow-600/20 pt-8 text-center text-slate-400 font-body">
            <p>&copy; 2025 New Family Tree. All rights reserved. Built with ❤️ for chosen families everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
