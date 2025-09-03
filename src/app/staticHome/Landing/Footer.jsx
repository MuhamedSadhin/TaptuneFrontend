import React from 'react'
import logo from '../../../assets/Image/logo2.svg'
import { formatDate } from 'date-fns'
import { Behance01Icon, Facebook01Icon, InstagramIcon, Linkedin01Icon, YoutubeIcon } from 'hugeicons-react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='w-full h-full'>
<footer className="h-full bg-raisin-black-400 w-full grid grid-rows-2">
    <div className='w-full h-full flex items-center justify-center text-2xl font-bold text-seasalt'>Thank you</div>
  <div className=" w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div className="col-span-full lg:col-span-1">
      <img src={logo} className="w-32" alt="" />
      </div>

      <div className="col-span-1">
        <h4 className="font-semibold text-gray-100">Product</h4>

        <div className="mt-3 grid space-y-3">
          <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Pricing</a></p>
          <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Changelog</a></p>
          <p><Link to={'/login'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Login</Link></p>
          <p><Link to={'/signup'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Sign Up</Link></p>
          <p><Link to={'/docs'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Docs</Link></p>
        </div>
      </div>

      <div className="col-span-1">
        <h4 className="font-semibold text-gray-100">Links</h4>

        <div className="mt-3 grid space-y-3">
          <p><Link to={'/'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Home</Link></p>
          <p><Link to={'/about-us'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">About us</Link></p>
          <p><Link to={'/help'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Help</Link></p>
          
          <p><Link to={'/contact'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Contact Us</Link></p>
          <p><Link to={'/privacy-policy'} className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200">Privacy policy</Link></p>
        </div>
      </div>

      <div className="col-span-2">
        <h4 className="font-semibold text-gray-100">Stay up to date</h4>

        <div>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full">
              <label htmlFor="hero-input" className="sr-only">Subscribe</label>
                    <input type="text" id="hero-input" name="hero-input" className=" w-full
                        mt-1 p-3 px-4 rounded-md border-2 border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-raisin-black-700 focus:border-transparent
                        hover:border-neutral-400 text-sm bg-transparent text-white"
                    />
            </div>
            <button className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-mindaro-600  hover:bg-mindaro-700 focus:outline-none focus:bg-mindaro-700 disabled:opacity-50 disabled:pointer-events-none text-raisin-black">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-400">
          Crafting connections with every tap, our cards sing harmony in the digital map
          </p>
        </div>
      </div>
    </div>

    <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          © {formatDate(new Date(), 'yyy')} Taptune.com
        </p>
      </div>

      <div>
        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
          <Facebook01Icon/>
        </a>
        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
          <InstagramIcon/>
        </a>
        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
          <Behance01Icon/>
        </a>
        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
          <Linkedin01Icon/>
        </a>
        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
          <YoutubeIcon/>
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
