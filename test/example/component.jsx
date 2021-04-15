const Foo = ({
  // #ifdef FLAG
  pullCamera,
  // #endif
}) => {
  return (
    <Demo
      // #ifdef FLAG
      pullCamera={pullCamera.bind(this, index)}
      // #endif
      // #ifndef APP-PLUS 
      className="not-app-plus"
      // #endif
    />
  )
}