export default function ReadingWritingFilePageSec2() {
  return (
    <>
      <h2>Section 2: Reading and Writing Files</h2>
      <div>
        <mark>fs.readFileSync</mark>
        <mark>fs.writeFileSync</mark>
      </div>
      <ul className="hasTypeDisc">
        <li>
          <label>Node Module:</label>
          <h4>
            <em>File System (FS)</em>
          </h4>
          <code>
            const fs = <strong>require('fs')</strong>
          </code>
        </li>
      </ul>

      <div className="hasOutline">
        <ul>
          <li>const fs = require('fs');</li>
          <li>
            const <em>textIn</em> = <strong>fs.readFileSync</strong>('./final/txt/input.txt',
            'utf-8')
          </li>
          <li>
            const <em>textOut</em> = `That is all what we know about avocado: $&#123;<em>textIn</em>
            &#125;`
          </li>
          <li>
            <strong>fs.writeFileSync</strong>('./final/txt/output.txt', <em>textOut</em>)
          </li>
        </ul>
        <hr />

        <h4 className="color-is-red">
          Blocks the others users. They must wait until the previous request is finished
        </h4>
      </div>

      <h2>Blocking and Non Blocking: Async Nature of Node.js</h2>
      <p>CALLBACK HELL (Do not use it!)</p>
      <div className="hasOutline">
        <ul className="hasVerticalPadding-3">
          <li>
            <strong>fs.readFile</strong>("start.txt", "utf-8", (err, data1) =&gt; &#123;{' '}
            <span className="color-is-gray">// (err, data1): Callback create</span>
          </li>
          <li>
            &nbsp;<strong>fs.readFile</strong>(`input.txt`, "utf-8", (err, data2) =&gt; &#123;
          </li>
          <li>
            &nbsp;&nbsp;<strong>fs.writeFile</strong>("final.txt", `$&#123;data1&#125;
            $&#123;data2&#125;`, (err) =&gt; &#123;
            <br />
            &nbsp;&nbsp;&nbsp;if (err) &#123; &nbsp;&nbsp;&nbsp;throw err; &#125; &#125;);
          </li>
          <li>&#125;);</li>
        </ul>
      </div>
    </>
  )
}
