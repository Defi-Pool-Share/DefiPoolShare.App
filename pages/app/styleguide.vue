<template>
  <h1 class="h1">
    <span class="grad-1">Dashboard</span>
  </h1>
  <h2 class="h2">Heading level 2</h2>
  <h3 class="h3">Heading level 3</h3>
  <hr class="app-hr">
  <h2 class="h2">Buttons</h2>
  <h3 class="h3">Buttons size</h3>
  <div class="button-group">
    <button class="btn">
      <span>Normal</span>
    </button>
    <button class="btn-sm">
      <span>Small</span>
    </button>
    <button class="btn-xs">
      <span>X-small</span>
    </button>
  </div>
  <h3 class="h3">Buttons type</h3>
  <div class="button-group">
    <button class="btn">
      <span>Default</span>
    </button>
    <button class="btn-secondary">
      <span>Secondary</span>
    </button>
    <button class="btn-danger">
      <span>Danger</span>
    </button>
    <button class="btn-success">
      <span>Success</span>
    </button>
    <button class="btn" disabled>
      <span>Disabled</span>
    </button>
  </div>
  <h3 class="h3">Buttons with icon</h3>
  <div class="button-group">
    <button class="btn">
      <span>Right</span>
      <Icon name="material-symbols:arrow-forward" />
    </button>
    <button class="btn-secondary">
      <Icon name="material-symbols:arrow-back-rounded" />
      <span>Left</span>
    </button>
    <button class="btn-danger">
      <span>Danger</span>
      <Icon name="humbleicons:times" />
    </button>
    <button class="btn-success">
      <span>Success</span>
      <Icon name="ic:baseline-check" />
    </button>
  </div>
  <h3 class="h3">Buttons only icon</h3>
  <div class="button-group">
    <button class="btn-min">
      <Icon name="material-symbols:arrow-forward" />
    </button>
    <button class="btn-secondary-min">
      <Icon name="material-symbols:arrow-back-rounded" />
    </button>
    <button class="btn-danger-min">
      <Icon name="humbleicons:times" />
    </button>
    <button class="btn-success-min">
      <Icon name="ic:baseline-check" />
    </button>
  </div>
  <hr class="app-hr">
  <h2 class="h2">Form</h2>
  <h3 class="h3">Field input & textarea</h3>
  <div class="grid-x2">
    <div>
      <div class="field">
        <label for="text">Label:</label>
        <div class="field-input">
          <input id="text" type="text" placeholder="Input">
        </div>
      </div>
    </div>
    <div>
      <div class="field">
        <label for="icon">Input with icon:</label>
        <div class="field-input">
          <Icon name="ri:lock-password-line" />
          <input id="icon" type="password" placeholder="Your password">
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <label for="textarea">Textarea:</label>
    <div class="field-input">
      <textarea id="textarea" placeholder="Hello,"></textarea>
    </div>
  </div>
  <div class="field">
    <label for="disabled">Input disabled:</label>
    <div class="field-input">
      <Icon name="ph:wallet" />
      <input id="disabled" type="text" value="0xDeFE33795803f2353C69FD8cdb432F9d5cEE6762" disabled>
    </div>
  </div>
  <div class="field">
    <label for="disabled">Input with button :</label>
    <div class="field-input">
      <Icon name="ph:wallet" />
      <input id="disabled" type="text" value="0xDeFE33795803f2353C69FD8cdb432F9d5cEE6762" disabled>
      <button class="btn-min">
        <Icon name="ph:copy-simple" />
      </button>
    </div>
  </div>
  <h3 class="h3">Checkbox</h3>
  <div class="check">
    <input type="checkbox" id="c1" name="checkbox" checked>
    <label for="c1">Input checkbox</label>
  </div>
  <div class="check">
    <input type="checkbox" id="c2" name="checkbox">
    <label for="c2">Input checkbox</label>
  </div>
  <div class="check">
    <input type="checkbox" id="c3" name="checkbox">
    <label for="c3">Input checkbox</label>
  </div>
  <h3 class="h3">Radio</h3>
  <div class="check">
    <input type="radio" id="r1" name="radio" checked>
    <label for="r1">Yes</label>
  </div>
  <div class="check">
    <input type="radio" id="r2" name="radio">
    <label for="r2">No</label>
  </div>
  <hr class="app-hr">
  <h2 class="h2">Text and paragraphe</h2>
  <div class="app-paragraphe">
    <p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dicta nisi quidem. Quasi perspiciatis sint itaque accusamus dolorem mollitia rerum, quisquam culpa similique, ad quam nisi! Deserunt modi aut ipsum?</strong></p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut laudantium ducimus, animi iste quidem aliquid odit error quas id voluptas aliquam qui dolor non dolores molestiae repellat dolorum iure neque.</p>
    <ul>
      <li v-for="i in 5">Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
    </ul>
    <p>Lorem ipsum, dolor <a class="grad-1">link in text</a> sit amet consectetur adipisicing elit. Sunt, est reprehenderit assumenda quaerat similique soluta quo reiciendis neque eum eius blanditiis iusto sed quas. Inventore adipisci nam quo asperiores voluptatibus.</p>
  </div>
  <hr class="app-hr">
  <h2 class="h2">Grid</h2>
  <h3 class="h3">Grid 4 columns</h3>
  <div class="grid-x4">
    <div v-for="i in 8">
      <div class="app-card">
        <div class="app-paragraphe">
          <p>Card</p>
        </div>
      </div>
    </div>
  </div>
  <h3 class="h3">Grid 3 columns (default)</h3>
  <div class="grid">
    <div v-for="i in 6">
      <div class="app-card">
        <div class="app-paragraphe">
          <p>Card</p>
        </div>
      </div>
    </div>
  </div>
  <h3 class="h3">Grid 2 columns</h3>
  <div class="grid-x2">
    <div v-for="i in 4">
      <div class="app-card">
        <div class="app-paragraphe">
          <p>Card</p>
        </div>
      </div>
    </div>
  </div>
</template>