import Vue from "vue";
import { ApiGetTodoList } from "@/api/todo";
import styles from "./index.module.less";

export default Vue.extend({
  name: "Todo",
  data() {
    return {
      todoList: [],
      loading: false
    };
  },
  methods: {
    async getTodoList() {
      this.loading = true;
      const resp = await ApiGetTodoList();
      this.loading = false;
      if (resp.code === 0) {
        this.todoList = resp.result.list;
      }
    },
    handleCheck(item) {
      const { id, isFinished } = item;
      this.todoList = this.todoList.filter(todo => todo.id !== id);
      if (isFinished) {
        this.todoList.push(item);
      } else {
        this.todoList.unshift(item);
      }
    },
    handleGoDetail(item) {
      this.$router.push({
        name: "TodoDetail",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getTodoList();
  },
  render() {
    const { todoList, loading } = this.$data;

    return (
      <EContainer>
        <EHeader
          title={this.$route.meta.title}
          type="menu"
          extra={
            <router-link
              to={{
                name: "TodoDetail"
              }}
            >
              <van-button plain type="info" class={styles.addBtn}>
                新增
              </van-button>
            </router-link>
          }
        />
        <EAside />
        <EContent>
          <ETodoCard
            loading={loading}
            todoList={todoList}
            onCheck={this.handleCheck}
            onGoDetail={this.handleGoDetail}
          />
        </EContent>
        <EFooter />
      </EContainer>
    );
  }
});
