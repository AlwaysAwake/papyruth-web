import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

let history = process.env.NODE_ENV === 'production'
//  ? createBrowserHistory()
  ? createHashHistory({ queryKey: false })
  : createHashHistory({ queryKey: false });

export default history;
