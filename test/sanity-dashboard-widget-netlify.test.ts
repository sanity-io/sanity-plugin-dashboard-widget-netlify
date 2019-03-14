import NetlifyWidget from '../src/components/NetlifyWidget'
/**
 * Dummy test
 */
describe('SanityPluginDashboardWidgetNetlify test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

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
