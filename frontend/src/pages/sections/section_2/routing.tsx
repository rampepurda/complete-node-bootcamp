export default function RoutingPage() {
  return (
    <>
      <h2>Section 2: Routing & Building Simple Api</h2>
      <div>
        <mark>http</mark>
        <mark>url</mark>
        <mark>writeHead()</mark>
        <mark>__dirname</mark>
      </div>
      <ul className="hasTypeDisc hasVerticalPadding-4">
        <li>
          <label>Node Module:</label>
          <h4>
            <em>"http" | "url"</em>
          </h4>
          <code>
            const http = <strong>require('http')</strong>
            <br />
            const url = <strong>require('url')</strong>
          </code>
        </li>
        <li>
          <strong>__dirname</strong>: instead src path use Node attr __dirname
        </li>
      </ul>

      <ul className="hasOutline hasVerticalPadding-5">
        <li>
          const <strong>data</strong> = <strong>fs.readFileSync</strong>(`
          <strong>$&#123;__dirname&#125;</strong>
          /data.json`, "utf-8");
        </li>
        <li>
          const <span className="color-is-red">server</span> ={' '}
          <em className="color-is-red">http.</em>
          <strong>createServer</strong>((<em>res, req</em>) =&gt; &#123;
        </li>
        <li>
          &nbsp;const pathName = <strong>res.url</strong>
          <br />
          &nbsp;if(pathName === '/products') &#123; <br />
          &nbsp;&nbsp;<strong>res.writeHead</strong>(200, &#123; "Content-type": "application/json"
          &#125;) &#123;
          <br />
          &nbsp;&nbsp;<strong>res.end</strong>(<strong>data</strong>)
        </li>
        <li>&nbsp;&#125;</li>
        <li>&nbsp;else &#123;</li>
        <li>
          &nbsp;&nbsp;<strong>res.writeHead</strong>(404) &#123;
          <br />
          &nbsp;&nbsp;<strong>res.end</strong>("Page was not founded, sorry");
        </li>
        <li>&#125;);</li>
      </ul>
    </>
  )
}
