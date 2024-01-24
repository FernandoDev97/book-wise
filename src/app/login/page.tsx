import Image from 'next/image'

const Login = () => {
  return (
    <main className="w-full h-[100vh] p-4">
      <div className="w-[40%] bg-logo-section-bg bg-no-repeat rounded-[10px] bg-center bg-cover flex justify-center items-center p-4 h-full">
        <Image
          src="/images/Logo.svg"
          alt="Logo Book Wise"
          width={0}
          height={0}
          className="w-auto h-auto"
          sizes="100vh"
        />
      </div>
      <div></div>
    </main>
  )
}

export default Login
