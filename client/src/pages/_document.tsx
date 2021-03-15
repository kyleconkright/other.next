import Document, { Html, Head, Main, NextScript } from 'next/document'

class OtherDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
       <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6637836/7151992/css/fonts.css" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default OtherDocument