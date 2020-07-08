import styles from "./index.module.less";
import classNames from "classnames";

export default {
  name: "TodoDetail",
  data() {
    return {
      statusVisible: false,
      statusData: {},
      statusOptions: [
        {
          name: "低优先级",
          key: "low",
          color: "#1890ff",
        },
        {
          name: "中优先级",
          key: "middle",
          color: "#52c41a",
        },
        {
          name: "高优先级",
          key: "height",
          color: "#faad14",
        },
        {
          name: "最高优先级",
          key: "heightest",
          color: "#f5222d",
        },
      ],
      currentDate: new Date(),
      visibleDate: false,
      todoData: {
        id: 3,
        title: "这是一段描述文字这是一段描述文字这是一段描述文字",
        description: "这是一段描述文字",
        date: "2020-03-03 19:11",
        status: 2,
        isFinished: false,
      },
    };
  },
  methods: {
    handleToggleCheck(event, item) {
      event.stopPropagation();
      item.isFinished = !item.isFinished;
    },
    handleOpenDate() {
      this.visibleDate = true;
    },
    handleCloseDate() {
      this.visibleDate = false;
    },
    handleConfirmDate(value) {
      console.log(value);
      this.todoData.date = this.$moment(value);
      this.handleCloseDate();
    },
    handleOpenStatus() {
      this.statusVisible = true;
    },
    handleCloseStatus() {
      this.statusVisible = false;
    },
    handleSelectStatus(value) {
      console.log(value);
      this.statusData = value;
      this.handleCloseStatus();
    },
  },
  render() {
    const {
      statusVisible,
      statusData,
      statusOptions,
      currentDate,
      visibleDate,
      todoData,
    } = this.$data;

    return (
      <EContainer class={classNames(styles.todoDetail)}>
        <EHeader
          extra={
            <van-button plain type="info" class={styles.saveBtn}>
              保存
            </van-button>
          }
        />
        <EContent>
          <div class={styles.todoDetailContent}>
            <div class={styles.todoDetailHeader}>
              <div
                class={styles.todoDetailHeaderItem}
                onClick={this.handleOpenStatus}
              >
                <span
                  style={{
                    color: statusData.color,
                  }}
                >
                  {statusData.name || "优先级"}
                </span>
              </div>
              <div class={styles.todoDetailHeaderItem}>
                <div
                  class={styles.todoDetailClaim}
                  onClick={this.handleOpenDate}
                >
                  <i class={classNames("iconfont", styles.icon)}>&#xe668;</i>
                  <span>
                    {this.$moment(todoData.date).calendar(null, {
                      sameElse: "MM-DD HH:mm",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <van-divider />
            <div
              class={classNames(styles.todoDetailTitle, {
                [styles.finished]: todoData.isFinished,
              })}
            >
              <span
                class={styles.todoDetailCheck}
                onClick={() => this.handleToggleCheck(todoData)}
              >
                <i
                  class={classNames("iconfont", styles.icon)}
                  domPropsInnerHTML={
                    todoData.isFinished ? "&#xe606;" : "&#xe6ca;"
                  }
                ></i>
              </span>
              <van-field
                class={classNames(styles.todoDetailInput)}
                value={todoData.title}
                placeholder="标题"
              />
            </div>
            <van-field
              class={classNames(styles.todoDetailInput, styles.textarea)}
              value={todoData.description}
              showWordLimit={true}
              maxlength="200"
              type="textarea"
              rows="10"
              autosize
              placeholder="记录你的美好123"
            />
          </div>
        </EContent>
        <van-action-sheet
          value={statusVisible}
          onInput={this.handleCloseStatus}
          actions={statusOptions}
          round={false}
          onSelect={this.handleSelectStatus}
        />
        <van-popup
          value={visibleDate}
          onInput={this.handleCloseDate}
          position="bottom"
        >
          <van-datetime-picker
            onCancel={this.handleCloseDate}
            onConfirm={this.handleConfirmDate}
            value={currentDate}
            type="datetime"
            title="选择完整时间"
          />
        </van-popup>
      </EContainer>
    );
  },
};
