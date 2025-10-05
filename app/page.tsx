import FeedCard from "@/components/feed-card"
import FamilyTreeCard from "@/components/family-tree-card"
import Testimonials from "@/components/testimonials"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Quote, Sparkles, Users, Crown } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Viral Quote and Chosen Family Image */}
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

      {/* Featured Story - Father & Son */}
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
            <Button className="btn-gold text-slate-900 font-bold border-2 border-yellow-400/30 mt-4">
              <Heart className="w-4 h-4 mr-2" />
              Read Their Story
            </Button>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feed Section */}
        <section className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gold-gradient font-display">Family Stories</h2>
            <div className="text-sm text-slate-400 flex gap-3 font-body">
              <span className="font-medium text-yellow-400">Trending</span>
              <span className="text-slate-500">•</span>
              <span>Latest</span>
            </div>
          </div>

          <FeedCard
            name="Marcus Johnson"
            time="2h ago"
            text="Today marks 1 year since David and I became father and son. Not by blood, but by choice. He's taught me as much as I've taught him. This is what real family looks like. 🤝❤️"
            image="/black-father-white-son-handshake-chosen-family.jpg"
            likes={2341}
            comments={456}
          />

          <FeedCard
            name="Aisha Rahman"
            time="5h ago"
            text="Five years ago, I walked into a support group feeling alone. Today, I have 12 people I call family who weren't in my life before. They chose me, and I chose them. That's real family. 💛"
            image="/diverse-mixed-race-family-smiling-reunion-outdoors.jpg"
            likes={842}
            comments={126}
          />

          <FeedCard
            name="David Chen"
            time="8h ago"
            text="My biological father left when I was 3. Marcus showed up when I was 23. He didn't have to choose me, but he did. And I chose him right back. Blood doesn't make family - love and commitment do. 🙏✨"
            likes={1567}
            comments={234}
          />

          <FeedCard
            name="Sofia Martinez"
            time="1 day ago"
            text="My daughter calls my best friend 'Auntie' even though we're not blood-related. Because family is about love, not DNA. Building a family tree that reflects the love in our lives, not just bloodlines. 🌳❤️"
            image="/happy-multiracial-mixed-family-smiling.jpg"
            likes={956}
            comments={189}
          />
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Your Circle */}
          <div className="card-luxury">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                <Users className="w-5 h-5 text-yellow-400" />
                Your Circle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FamilyTreeCard name="Marcus Johnson" relation="Chosen Father" />
              <FamilyTreeCard name="Aisha Rahman" relation="Chosen Sister" />
              <FamilyTreeCard name="Sofia Martinez" relation="Chosen Aunt" />
              <Button className="w-full mt-4 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/30">
                Build Your Circle
              </Button>
            </CardContent>
          </div>

          {/* Community Stats */}
          <div className="card-gold">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">New connections</span>
                <span className="font-bold text-yellow-800">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">Stories shared</span>
                <span className="font-bold text-yellow-800">15,432</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">Hearts given</span>
                <span className="font-bold text-yellow-800">89,231</span>
              </div>
            </CardContent>
          </div>

          {/* Founder Message */}
          <div className="card-luxury border-2 border-yellow-600/30">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                AS
              </div>
              <CardTitle className="text-lg text-slate-100">From Our Founder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                "I created New Family Tree because I believe everyone deserves a family that loves them unconditionally.
                Blood doesn't make family - love, respect, and choice do."
              </p>
              <p className="text-yellow-400 text-sm mt-3 font-body italic">— Alexian Scruggs</p>
            </CardContent>
          </div>
        </aside>
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
