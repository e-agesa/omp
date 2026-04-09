import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-omp-dark text-white mt-auto overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/footer-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-10"
        aria-hidden="true"
      />
      <div className="relative z-10 px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="/images/logo-blue.jpeg"
                alt="Our Mall Pharmacy"
                width={200}
                height={72}
                className="h-18 sm:h-20 w-auto object-contain rounded-medical"
              />
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Our Mall Pharmacy — Kenya&apos;s trusted online pharmacy.
              Quality medicines delivered to your doorstep.
            </p>
            {/* PPB Verification */}
            <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-medical p-3">
              <svg className="w-8 h-8 text-omp-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div>
                <p className="text-[10px] font-bold text-omp-green uppercase">PPB Verified</p>
                <p className="text-[9px] text-gray-400">
                  Pharmacy &amp; Poisons Board of Kenya
                </p>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/category/supplements" className="hover:text-white transition-colors">Supplements</Link></li>
              <li><Link href="/category/beauty" className="hover:text-white transition-colors">Beauty & Skincare</Link></li>
              <li><Link href="/category/mother-baby" className="hover:text-white transition-colors">Mother & Baby</Link></li>
              <li><Link href="/category/chronic-care" className="hover:text-white transition-colors">Chronic Care</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/prescription" className="hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">My Health Dashboard</Link></li>
              <li><Link href="/health" className="hover:text-white transition-colors">Health Articles</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>
                <a href="tel:+254700000000" className="hover:text-white transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li>
                <a href="mailto:support@omp.co.ke" className="hover:text-white transition-colors">
                  support@omp.co.ke
                </a>
              </li>
            </ul>
            {/* Payment badges */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="bg-mpesa text-white text-[10px] font-bold px-2 py-1 rounded">
                M-Pesa
              </span>
              <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded">
                Visa
              </span>
              <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded">
                Mastercard
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Our Mall Pharmacy. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Returns</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
