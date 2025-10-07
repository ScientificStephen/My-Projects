import { Button } from "@/components/ui/button"
import { Heart, Quote, Sparkles, Crown } from "lucide-react"
import Image from "next/image"
import Testimonials from "@/components/testimonials"
import SocialShare from "@/components/social-share"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 z-10" />
        <Image
          src="/black-father-white-son-handshake-chosen-family.jpg"
          alt="Black father and white son shaking hands - chosen family"
          width={1200}
          height={600}
          className="object-cover w-full h-[600px] opacity-40"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <Quote className="w-16 h-16 text-yellow-400 mx-auto mb-6 opacity-50" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display leading-tight">
              You might not have been born with the family you <span className="text-gold-gradient">want</span>
              <br />
              but here you can build the family you <span className="text-gold-gradient">love</span>
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-4 font-body italic">— Alexian Scruggs, Founder</p>

            <div className="flex gap-4 justify-center flex-wrap mt-8">
              <Button
                size="lg"
                className="btn-gold text-slate-900 font-bold shadow-2xl text-lg px-8 border-2 border-yellow-400/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Build Your Family
              </Button>
              <SocialShare
                title="Build the Family You Love"
                text="You might not have been born with the family you want but here you can build the family you love. Join New Family Tree today!"
              />
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-slate-300 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-gradient">10,000+</div>
                <div className="text-sm font-body">Chosen Families</div>
              </div>
              <div className="w-px h-12 bg-slate-600" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-gradient">50+</div>
                <div className="text-sm font-body">Countries</div>
              </div>
              <div className="w-px h-12 bg-slate-600" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-gradient">1M+</div>
                <div className="text-sm font-bold text-gold-gradient">Connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      <div className="card-luxury shadow-luxury border-2 border-yellow-600/30">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="/black-father-white-son-handshake-chosen-family.jpg"
              alt="Marcus and David - Father and Son"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="inline-block bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold border border-yellow-600/30">
              Featured Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gold-gradient font-display">
              When Marcus Became a Father Again
            </h2>
            <p className="text-slate-300 leading-relaxed font-body text-lg">
              Marcus, 45, thought his chance at fatherhood had passed. David, 23, had never known a father figure. When
              they met on New Family Tree, something clicked. "The moment we shook hands, I knew I'd found my dad,"
              David says. Marcus adds, "Blood didn't make us family. Choice did. Love did."
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg border-2 border-slate-900">
                  M
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg border-2 border-slate-900">
                  D
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-100 font-display">Marcus & David</div>
                <div className="text-sm text-yellow-400 font-body">Father & Son • Since 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shareable Quote Card */}
      <div className="card-luxury text-center py-12 px-8 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <SocialShare
            title="Family isn't always blood"
            text="Family isn't always blood. It's the people in your life who want you in theirs. The ones who accept you for who you are."
          />
        </div>
        <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <blockquote className="text-2xl md:text-3xl text-slate-100 font-display italic mb-4 leading-relaxed">
          "Family isn't always blood. It's the people in your life who want you in theirs. The ones who accept you for
          who you are."
        </blockquote>
        <p className="text-yellow-400 font-body">— The New Family Tree Community</p>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* How It Works */}
      <div className="card-luxury shadow-luxury py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-4 font-display">How It Works</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-body">
            Building your chosen family is simple and authentic
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto border-4 border-yellow-400/30">
              1
            </div>
            <h3 className="text-2xl font-bold text-slate-100 font-display">Create Your Profile</h3>
            <p className="text-slate-300 font-body">
              Share who you are and what you're looking for in a chosen family member
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto border-4 border-yellow-400/30">
              2
            </div>
            <h3 className="text-2xl font-bold text-slate-100 font-display">Connect & Meet</h3>
            <p className="text-slate-300 font-body">
              Browse profiles, send messages, and meet people who resonate with your values
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto border-4 border-yellow-400/30">
              3
            </div>
            <h3 className="text-2xl font-bold text-slate-100 font-display">Build Your Family</h3>
            <p className="text-slate-300 font-body">
              Add them to your family tree and nurture the relationships that matter most
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card-luxury text-center py-16 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Ready to Build Your Chosen Family?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-body">
            Join thousands who have found their true family - the people who choose them every day.
          </p>
          <Button
            size="lg"
            className="btn-gold text-slate-900 font-bold shadow-2xl text-xl px-12 py-6 border-2 border-yellow-400/30"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Your Journey
          </Button>
          <p className="text-slate-400 text-sm mt-6 font-body">
            Free to join • No credit card required • 10,000+ families built
          </p>
        </div>
      </div>
    </div>
  )
}
