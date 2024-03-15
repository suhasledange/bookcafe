import Providers from '@/store/Providers'
import Footer from './components/Footer'
import Header from './components/Header'
import './globals.css'
import { ContextProvider } from '@/context/ToastContext'

export const metadata = {
  title: 'BookCafe',
  description: 'Online Book Rental Service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <ContextProvider>
        <Header/>
        {children}
        <Footer/>
          </ContextProvider>
        </Providers>
        </body>
    </html>
  )
}
