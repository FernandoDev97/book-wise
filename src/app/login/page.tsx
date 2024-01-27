import { AuthButtons } from '@/components/common/auth-buttons'
import Image from 'next/image'

const Login = () => {
  return (
    <main className="w-full h-[100vh] flex p-4">
      <section className="w-[40%] bg-logo-section-bg bg-no-repeat rounded-[10px] bg-center bg-cover flex justify-center items-center p-4 h-full">
        <Image
          src="/images/Logo.svg"
          alt="Logo Book Wise"
          width={0}
          height={0}
          className="w-auto h-auto"
          sizes="100vh"
        />
      </section>
      <section className="w-[60%] max-w-[372px] mx-auto h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-2xl font-bold">Boas vindas!</p>
          <p className="text-base font-normal">
            Faça seu login ou acesse como visitante.
          </p>
          <AuthButtons />
        </div>
      </section>
    </main>
  )
}

export default Login
