import {ListViewProvider} from './ListViewProvider'
import {QueryRequestProvider} from './QueryRequestProvider'
import {QueryResponseProvider} from './QueryResponseProvider'

type WrapProp<T> = {
  queryName: string
  children?: React.ReactNode
  fetchData: (query: string) => T
}

const IndexListWrapper = <T extends object>({queryName, children, fetchData}: WrapProp<T>) => (
  <QueryRequestProvider>
    <QueryResponseProvider queryName={queryName} fetchData={fetchData}>
      <ListViewProvider>{children}</ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {IndexListWrapper}
