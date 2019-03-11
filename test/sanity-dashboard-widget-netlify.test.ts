import SanityPluginDashboardWidgetNetlify from "../src/index"
import NetlifyWidget from '../src/NetlifyWidget'
/**
 * Dummy test
 */
describe("SanityPluginDashboardWidgetNetlify test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("NetlifyWidget is instantiable", () => {
    expect(new NetlifyWidget({})).toBeInstanceOf(NetlifyWidget)
  })
})
