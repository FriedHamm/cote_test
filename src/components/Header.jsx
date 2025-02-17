'use client'
import Link from "next/link";
import {useState} from "react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import LoginMenu from "@/components/LoginMenu";
import api from "@/axios/axiosConfig";
import {logout} from "@/store/slices/authSlice";

const navigation = [
  {name: '코딩테스트', href: '/problems'},
  {name: '커뮤니티', href: '#'}
]

export default function Header() {
  const dispatch = useDispatch();
  const {isLoggedIn, role} = useSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname().split('/')[1];

  const onLogout = async () => {

    try {
      const response = await api.post('account/v1/auth/token/revocation');
      dispatch(logout());
      alert('로그아웃 되었습니다.');
    } catch (error) {
      alert(error);
    }


  }

  if (pathname === 'problem') return null;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Nossi.Dev</span>
            <img
              alt="logo"
              src="/logo.webp"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        {/*{모바일에서만 나오는 버튼임}*/}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={(e) => {
              setMobileMenuOpen(true);
            }}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ?
            <LoginMenu onLogout={onLogout} isLoggedIn={isLoggedIn} />
            :
            <Link href="/account/sign-in" className="text-sm/6 font-semibold text-gray-900">
              로그인 <span aria-hidden="true">&rarr;</span>
            </Link>}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-50 pointer-events-none"/>
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
          transform transition duration-300 ease-in-out data-[closed]:translate-x-full">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/logo.webp"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/account/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  로그인
                </Link>
                {isLoggedIn &&
                  <>
                    <Link
                      href="/user/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={onLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      로그아웃
                    </button>
                  </>
                }

              </div>

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}