import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Twitter, ShoppingBag, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiAssistantNotification } from "@/components/ai-assistant-notification"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">C&R</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/auth" className="hover:text-orange-500 transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/auth?tab=register" className="hover:text-orange-500 transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-zinc-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <h2
                className="text-6xl md:text-8xl font-bold text-center mb-4 tracking-tight"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
              >
                Connected
              </h2>
              <h2
                className="text-6xl md:text-8xl font-bold text-center tracking-tight"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
              >
                <span className="text-orange-500">&</span> Respected
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <p className="text-xl mb-6">
                  Elevate your style with our curated collection of urban streetwear. Be bold, be authentic.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                  Shop the Look
                </Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80"
                  alt="Featured urban outfit"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80"
                  alt="Premium High-Top Sneakers"
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold mb-2">Premium High-Top Sneakers</h3>
                  <p className="text-sm text-gray-300 mb-4">Limited Edition Release</p>
                  <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
                  alt="Vintage Leather Jacket"
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold mb-2">Vintage Leather Jacket</h3>
                  <p className="text-sm text-gray-300 mb-4">Classic Style Redefined</p>
                  <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
                  alt="Urban Street Hoodie"
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold mb-2">Urban Street Hoodie</h3>
                  <p className="text-sm text-gray-300 mb-4">Comfort Meets Style</p>
                  <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80"
                  alt="Designer Cargo Pants"
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold mb-2">Designer Cargo Pants</h3>
                  <p className="text-sm text-gray-300 mb-4">Urban Utility Wear</p>
                  <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Special Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden text-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80"
                  alt="Limited Edition Sneakers"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Limited Edition Sneakers</h3>
                  <p className="text-zinc-600 mb-2 line-through">$149.99</p>
                  <p className="text-orange-500 font-bold mb-2">$99.99</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Add to Cart</Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden text-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
                  alt="Vintage Leather Jacket"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Vintage Leather Jacket</h3>
                  <p className="text-zinc-600 mb-2 line-through">$199.99</p>
                  <p className="text-orange-500 font-bold mb-2">$149.99</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Add to Cart</Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden text-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1578681994506-b8f463449011?w=500&q=80"
                  alt="Urban Bomber Jacket"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Urban Bomber Jacket</h3>
                  <p className="text-zinc-600 mb-2 line-through">$89.99</p>
                  <p className="text-orange-500 font-bold mb-2">$69.99</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Add to Cart</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Custom Design Section */}
        <section className="py-16 bg-zinc-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Design Your Own</h2>
            <Tabs defaultValue="shirt" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="shirt">Custom Shirt</TabsTrigger>
                <TabsTrigger value="pants">Custom Pants</TabsTrigger>
              </TabsList>
              <TabsContent value="shirt">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Design Your Shirt</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="shirt-image">Upload Image</Label>
                        <div className="mt-1 flex items-center">
                          <Label
                            htmlFor="shirt-image"
                            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                          >
                            <span className="flex items-center space-x-2">
                              <Upload className="w-6 h-6 text-gray-600" />
                              <span className="font-medium text-gray-600">Click to upload image</span>
                            </span>
                            <Input id="shirt-image" type="file" className="hidden" accept="image/*" />
                          </Label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shirt-text">Custom Text</Label>
                        <Input id="shirt-text" placeholder="Enter text for your shirt" />
                      </div>
                      <div>
                        <Label htmlFor="shirt-notes">Additional Notes</Label>
                        <Textarea id="shirt-notes" placeholder="Any special instructions or details?" />
                      </div>
                      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                        Create Custom Shirt
                      </Button>
                    </form>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-zinc-400">Shirt Preview</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pants">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Design Your Pants</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="pants-image">Upload Image</Label>
                        <div className="mt-1 flex items-center">
                          <Label
                            htmlFor="pants-image"
                            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                          >
                            <span className="flex items-center space-x-2">
                              <Upload className="w-6 h-6 text-gray-600" />
                              <span className="font-medium text-gray-600">Click to upload image</span>
                            </span>
                            <Input id="pants-image" type="file" className="hidden" accept="image/*" />
                          </Label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="pants-text">Custom Text</Label>
                        <Input id="pants-text" placeholder="Enter text for your pants" />
                      </div>
                      <div>
                        <Label htmlFor="pants-notes">Additional Notes</Label>
                        <Textarea id="pants-notes" placeholder="Any special instructions or details?" />
                      </div>
                      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                        Create Custom Pants
                      </Button>
                    </form>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-zinc-400">Pants Preview</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578681994506-b8f463449011?w=500&q=80"
                  alt="Urban Bomber Jacket"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Urban Bomber Jacket</h3>
                  <p className="text-zinc-600 mb-2">$89.99</p>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Add to Cart</Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80"
                  alt="Classic High-Top Sneakers"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Classic High-Top Sneakers</h3>
                  <p className="text-zinc-600 mb-2">$79.99</p>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Add to Cart</Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
                  alt="Graphic Street Hoodie"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Graphic Street Hoodie</h3>
                  <p className="text-zinc-600 mb-2">$64.99</p>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Add to Cart</Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80"
                  alt="Retro Basketball Jersey"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Retro Basketball Jersey</h3>
                  <p className="text-zinc-600 mb-2">$54.99</p>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Add to Cart</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">The C&R Story</h2>
                <p className="mb-4 text-lg">
                  More than just a brand, we're a movement. Connected & Respected brings you authentic urban fashion
                  that speaks to the heart of street culture. Our designs are a fusion of style, comfort, and attitude.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-zinc-800 text-lg px-8 py-3"
                >
                  Our Legacy
                </Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                  alt="About Connected & Respected"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-zinc-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">C&R</h3>
                <p>Urban style for the connected generation.</p>
                <address className="mt-4 not-italic">
                  <p>1275 Winchester Road</p>
                  <p>Memphis, Tennessee 38116</p>
                  <p className="mt-2">
                    <a href="mailto:Spook504@gmail.com" className="hover:text-orange-500 transition-colors">
                      Spook504@gmail.com
                    </a>
                  </p>
                </address>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://www.facebook.com/connectedandrespected"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/connectedandrespected"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://www.twitter.com/connectedandrespected"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <Twitter size={24} />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="https://connectedandrespected.myshopify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <ShoppingBag size={24} />
                    <span className="sr-only">Shopify Store</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500 transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
                <p className="mb-4">Subscribe to our newsletter for the latest drops and exclusive offers.</p>
                <form className="flex">
                  <Input type="email" placeholder="Your email" className="rounded-r-none" />
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-700 text-center">
              <p>&copy; 2025 Connected & Respected. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
      <AiAssistantNotification />
    </div>
  )
}
