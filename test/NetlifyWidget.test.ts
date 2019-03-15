import NetlifyWidget from '../src/components/NetlifyWidget'

describe('NetlifyWidget', () => {
  it('NetlifyWidget is instantiable', () => {
    expect(
      new NetlifyWidget({
        title: 'Deployz',
        sites: [
          {
            id: '123',
            name: 'Foobar',
            buildHookId: 'abcd'
          }
        ],
        isLoading: false,
        onDeploy: () => void 0
      })
    ).toBeInstanceOf(NetlifyWidget)
  })
})
