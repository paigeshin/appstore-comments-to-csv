const store = require("app-store-scraper");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

async function scrapeComments(id, sort, page) {
  return new Promise((resolve, reject) => {
    store
      .reviews({
        id: id,
        sort: sort,
        page: page,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function generateCommentsJSON(id, sort) {
  return new Promise(async (resolve, reject) => {
    const comments = [];
    for (i = 1; i <= 10; i++) {
      // id, sort, index
      try {
        const result = await scrapeComments(id, sort, i);
        for (comment of result) {
          comments.push(comment);
        }
      } catch (err) {
        reject(err);
      }
    }
    resolve(comments);
  });
}

function createCSVFile(dir, fileName, data) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const csvWirter = createCsvWriter({
    path: `${dir}/${fileName}`,
    header: [
      { id: "id", title: "Id" },
      { id: "userName", title: "UserName" },
      { id: "userUrl", title: "UserURL" },
      { id: "version", title: "Version" },
      { id: "score", title: "Score" },
      { id: "title", title: "Title" },
      { id: "text", title: "Text" },
      { id: "url", title: "URL" },
    ],
  });

  csvWirter
    .writeRecords(data)
    .then(() =>
      console.log(`The CSV file was written successfully at ${dir}/${fileName}`)
    );
}

async function collectAppStoreComments(appId, appName) {
  const recentComments = await generateCommentsJSON(appId, store.sort.RECENT);
  const helpfulComments = await generateCommentsJSON(appId, store.sort.HELPFUL);
  createCSVFile(`./comments/${appName}`, `recents.csv`, recentComments);
  createCSVFile(`./comments/${appName}`, `helpfuls.csv`, helpfulComments);
}

module.exports = collectAppStoreComments;
