type ShapeCompositionProps = {
  grayscale?: boolean
}

export function ShapeComposition({ grayscale = false }: ShapeCompositionProps) {
  return (
    <div
      className={`hero-art-stage${grayscale ? " footer-art-stage" : ""}`}
      aria-hidden="true"
    >
      {!grayscale && <span className="hero-art-grid" />}
      <span className="hero-art-shape hero-art-shape-blue" />
      <span className="hero-art-shape hero-art-shape-pink" />
      <span className="hero-art-shape hero-art-shape-yellow" />
      <span className="hero-art-shape hero-art-shape-purple" />
      <span className="hero-art-pixel hero-art-pixel-one" />
      <span className="hero-art-pixel hero-art-pixel-two" />
      <span className="hero-art-pixel hero-art-pixel-three" />
      <span className="hero-art-pixel hero-art-pixel-four" />
    </div>
  )
}
