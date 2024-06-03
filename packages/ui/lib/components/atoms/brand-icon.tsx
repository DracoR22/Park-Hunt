export interface IBrandIcon {
  logo: string
  height?: number
  width?: number
}

export const BrandIcon = ({ logo, height, width }: IBrandIcon) => {
  return (
    <div className="inline-block">
      <img src={logo} alt="logo" height={height} width={width} />
    </div>
  )
}
