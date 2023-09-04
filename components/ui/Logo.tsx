import Image from 'next/image'
import everscaleLogo from 'public/everscale_logo.png'

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center text-lg font-semibold w-32 tracking-tight text-gray-900 dark:text-white">
      <span style={{ paddingRight: '2px' }}>tvm</span>
      <Image src={everscaleLogo} width={30} height={23} />
      <span style={{ paddingLeft: '2px' }}>codes</span>
    </div>
  )
}
