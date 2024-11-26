export default function CreatingSimpleWebServerPageSec2() {
  return (
    <>
      <h2>Section 2: Creating Simple Web Server</h2>
      <div>
        <mark>const http = require("http");</mark>
        <mark>createServer(res, req)</mark>
        <mark>.end</mark>
        <mark>.listen</mark>
      </div>
      <ul className="hasTypeDisc hasVerticalPadding-4">
        <li>
          <label>Node Module:</label>
          <h4>
            <em>"http"</em>
          </h4>
          <code>
            const http = <strong>require('html')</strong>
          </code>
        </li>
      </ul>

      <ul className="hasOutline hasVerticalPadding-4">
        <li>
          const <span className="color-is-red">server</span> ={' '}
          <em className="color-is-red">http.</em>
          <strong>createServer</strong>((<em>res, req</em>) =&gt; &#123;
        </li>
        <li>
          &nbsp;<em>res.</em>
          <strong>end</strong>("Hello from the Server");
        </li>
        <li>&#125;);</li>
        <li>
          <span className="color-is-red">server</span>.<strong>listen</strong>(4040, () =&gt; &#123;
        </li>
        <li>&nbsp;console.log(`Server is running on port 4040`);;</li>
        <li>&#125;);</li>
      </ul>
    </>
  )
}
