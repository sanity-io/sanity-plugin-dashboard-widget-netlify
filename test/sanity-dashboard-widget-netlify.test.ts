import NetlifyWidget from '../src/components/NetlifyWidget'

describe('sanity-plugin-dashboard-widget-netlify', () => {
  it('NetlifyWidget is instantiable', () => {
    expect(
      new NetlifyWidget({
        title: 'Deployz',
        sites: [],
        isLoading: false,
        onDeploy: () => void 0
      })
    ).toBeInstanceOf(NetlifyWidget)
  })
})
