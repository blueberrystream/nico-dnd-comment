const standardCommentSetEl = _id("standard-comment-set");

const saveOptions = () => {
  const standardCommentSet = standardCommentSetEl.value
    .replace(/\r/g, "")
    .split("\n")
    .filter((s) => s.trim() != "")
    .join("\n");
  chrome.storage.sync.set({ standardCommentSet: standardCommentSet }, () => {
    standardCommentSetEl.value = standardCommentSet;
    const statusEl = _id("status");
    statusEl.textContent = "✔ 保存しました";
    setTimeout(() => {
      statusEl.textContent = "";
    }, 750);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
    standardCommentSetEl.value = items.standardCommentSet;
  });
};

const restoreDefaultOptions = () => {
  standardCommentSetEl.value = DEFAULT_STANDARD_COMMENT_SET;
  saveOptions();
};

document.addEventListener("DOMContentLoaded", restoreOptions);
_id("save").addEventListener("click", saveOptions);
_id("restore-default").addEventListener("click", restoreDefaultOptions);
