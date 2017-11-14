const test = require("tape");
const h = require("./h");
const renderer = require("./render");
const hyperx = require("hyperx");
const html = hyperx(h);
require("jsdom-global")();

test("integration with hyperx", function (t) {
    const before = html`
     <div className="concert-info">
      <header className="logo-header">
        <h1 className="logo-header__title">
          <a href="/">
            opener 2017
          </Link>
        </h1>
        <h3 className="logo-header__subtitle">festival organizer</h3>
      </header>
      <div className="concert-details">
        <h1>
          Radiohead
        </h1>
        <p>
          N/A
        </p>
      </div>
    </div>
    `;

    const after1 = html`
     <div className="concert-info">
      <header className="logo-header">
        <h1 className="logo-header__title">
          <a href="/">
            opener 2017
          </Link>
        </h1>
        <h3 className="logo-header__subtitle">festival organizer</h3>
      </header>
      <div className="concert-details">
        <h1>
          Foo Fighters
        </h1>
        <p>
          N/A
        </p>
      </div>
    </div>
    `;

    const after2 = html`
     <div className="concert-info">
      <header className="logo-header">
        <h1 className="logo-header__title">
          <a href="/">
            opener 2017
          </Link>
        </h1>
        <h3 className="logo-header__subtitle">festival organizer</h3>
      </header>
      <div className="concert-details">
        <h1>
          Dua Lipa
        </h1>
        <p>
          N/A
        </p>
      </div>
    </div>
    `;

    const render = renderer();
    render(before);
    render(after1);
    render(after2);

    console.log(document.body.innerHTML);

    t.end();
});