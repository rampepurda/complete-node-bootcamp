export default function RoutingPageSec2() {
  return (
    <>
      <h2>Section 2: Routing</h2>
      <div>
        <mark>url</mark>
        <mark>writeHead()</mark>
      </div>
      <ul className="hasTypeDisc hasVerticalPadding-4">
        <li>
          <label>Node Module:</label>
          <h4>
            <em>"url"</em>
          </h4>
          <code>
            const url = <strong>require('url')</strong>
          </code>
        </li>
      </ul>

      <ul className="hasOutline hasVerticalPadding-5">
        <li>
          const <span className="color-is-red">server</span> ={' '}
          <em className="color-is-red">http.</em>
          <strong>createServer</strong>((<em>res, req</em>) =&gt; &#123;
        </li>
        <li>
          &nbsp;const pathName = <strong>res.url</strong>
          <br />
          &nbsp;if(pathName === '/test') &#123; <br />
          &nbsp;&nbsp;<strong>res.end</strong>('Hello from /test page')
        </li>
        <li>&nbsp;&#125;</li>
        <li>&nbsp;else &#123;</li>
        <li>
          &nbsp;&nbsp;<strong>res.writeHead</strong>() &#123;
          <br />
          &nbsp;&nbsp;<strong>res.end</strong>("Page was not founded, sorry");
        </li>
        <li>&#125;);</li>
      </ul>
    </>
  )
}
