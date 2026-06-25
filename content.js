// definitions
const BUTTONS_CONTAINER_ID = "_DNDC_Container";
const COMMENT_BUTTON_CLASS_NAME = "_DNDC_Button";

const setDraggable = (isAvailable) => {
  _$$(`.${COMMENT_BUTTON_CLASS_NAME}`).forEach((buttonEl) => {
    buttonEl.draggable = isAvailable;
    buttonEl.disabled = !isAvailable;
  })
};

const createButtonsContainerEl = () => {
  const buttonsContainerEl = document.createElement("div");
  buttonsContainerEl.id = BUTTONS_CONTAINER_ID;
  buttonsContainerEl.classList.add(
    ...["pos_relative", "d_flex", "flex-wrap_wrap", "gap_x2", "ai_center", "bx-s_content-box"],
  );
  buttonsContainerEl.style.gap = "8px";

  chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
    items.standardCommentSet.split("\n").forEach((comment) => {
      const buttonEl = document.createElement("button");
      buttonEl.classList.add(
        ...[
          COMMENT_BUTTON_CLASS_NAME,
          "Pressable",
          "cursor_pointer",
          "d_inline-flex",
          "ai_center",
          "jc_center",
          "gap_x0_5",
          "px_x2",
          "bdr_full",
          "fs_base",
          "fw_bold",
          "button-color_base",
          "white-space_nowrap",
          "us_none",
          "h_x5",
        ],
      );
      buttonEl.innerText = comment;
      buttonEl.draggable = true;
      buttonEl.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", comment);
        e.dataTransfer.effectAllowed = "copy";
      });
      buttonEl.addEventListener("dragend", (e) => {
        e.dataTransfer.clearData("text/plain");

        // make sure that textarea's content is same as button's
        if (_$('[placeholder="コメントを入力"]').value != comment) return;

        // send comment by clicking the button
        setTimeout(() => {
          _$('[aria-label="コメント投稿ボタン"]').click();
        }, 100);

        // prevent comment flooding by disabling buttons for 3 seconds
        setDraggable(false);
        setTimeout(() => setDraggable(true), 3000);
      });

      buttonsContainerEl.appendChild(buttonEl);
    });
  });

  return buttonsContainerEl;
};

// mutation observer to manage buttons container
const callbackFn = (_mutationList, _observer) => {
  const container = _id(BUTTONS_CONTAINER_ID);

  // append buttons container if not exists and not in fullscreen
  if (container == null && document.fullscreenElement == null) {
    const parentEl = _$(".PlayerPresenter");
    if (parentEl == null) return;
    parentEl.appendChild(createButtonsContainerEl());
  }

  // remove buttons container if exists and in fullscreen
  if (container != null && document.fullscreenElement != null) {
    container.remove();
  }
};
const observer = new MutationObserver(callbackFn);
observer.observe(document.body, { childList: true, subtree: true });
