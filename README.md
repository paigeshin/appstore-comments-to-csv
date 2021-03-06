### Install

```bash
npm install appstore-comments-to-csv
```

### Description

- 500 comments will be collected from app store and generate `csv` files.
- Two types of collection files.
  - Helpful
  - Recent

### Usage

```jsx
const {
  collectAppStoreComments,
  generateCommentsJSON,
} = require("appstore-comments-to-csv");

// first argument => App Id
// second argument => App Name (name of directory which will contain result files)
collectAppStoreComments(874656917, "IAM");

// first argument => App Id
// second argument => SORT,  RECENT | HELPFUL
const recentComments = await generateCommentsJSON(appId, "RECENT");
const helpfulComments = await generateCommentsJSON(appId, "HELPFUL");
```

### How to find AppStore App Id?

![img1.png](./img1.png)

![img2.png](./img2.png)

### Output

![img3.png](./output1.png)

![img4.png](./output2.png)
