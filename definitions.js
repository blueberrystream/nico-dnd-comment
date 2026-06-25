const DEFAULT_STANDARD_COMMENT_SET = [
  "うぽつ",
  "8888",
  "おつ",
  "ここすき",
  "ええやん",
  "ｱｶﾈﾁｬﾝｶﾜｲｲﾔｯﾀｰ",
  "おいしそう",
].join("\n");
const DEFAULT_OPTIONS = {
  standardCommentSet: DEFAULT_STANDARD_COMMENT_SET
};

const _$ = (s) => document.querySelector(s);
const _$$ = (s) => document.querySelectorAll(s);
const _id = (s) => document.getElementById(s);
