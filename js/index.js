/*
 * @Author: chenyh 
 * @Date: 2018-04-20 16:24:35 
 * @Last Modified by: chenyh
 * @Last Modified time: 2018-04-20 16:42:54
 */

new Vue({
    el: "#root",
    data: {
        //输入框
        inputValue: "",
        //模拟数据
        tableData: [{
            time: 1524212060000,
            content: '跑步',
            status: false
        }, {
            time: 1524212070000,
            content: '游泳',
            status: true
        }, {
            time: 1524212080000,
            content: '打游戏',
            status: false
        }, {
            time: 1524212090000,
            content: '看电视',
            status: true
        }]
    },
    //初始化后
    created: function() {
        // 查看本地是否有todolist
        if (!!localStorage.getItem('todolist')) {
            // 如果本地有
            this.tableData = JSON.parse(localStorage.getItem('todolist'));
        } else {
            //如果本地没有
            // 创建一个本地存储
            localStorage.setItem('todolist', JSON.stringify(this.tableData));
        }

    },
    // 计算属性 计算待完成事务的个数
    computed: {
        todoLength: function() {
            var newArr = this.tableData.filter(function(item) {
                return item.status === false;
            });
            return newArr.length;
        }
    },
    methods: {

        //提交任务
        haddleSubmit: function() {
            if (this.inputValue) {
                var tem = {
                    time: Date.parse(new Date()), // 获取当前时间
                    content: this.inputValue,
                    status: false
                };
                //插入任务
                this.tableData.push(tem);
                // 清空输入框
                this.inputValue = "";
            }
            // 同步
            localStorage.setItem('todolist', JSON.stringify(this.tableData));
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('删除任务“' + row.content + '”, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var myindex = this.tableData.indexOf(row)
                this.tableData.splice(myindex, 1)
                    // 同步
                localStorage.setItem('todolist', JSON.stringify(this.tableData));
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 更改状态
        handleChange: function(index, row) {
            var myindex = this.tableData.indexOf(row)
            this.tableData[myindex].status = !this.tableData[myindex].status;
            if (this.tableData[myindex].status) {
                this.$message({
                    type: 'info',
                    message: '已设为已完成'
                });
            } else {
                this.$message({
                    type: 'info',
                    message: '已设为进行中'
                });
            }
            // 同步
            localStorage.setItem('todolist', JSON.stringify(this.tableData));

        },
        //时间格式化
        formatter(row, column) {
            var formatString = 'YYYY-MM-DD HH:mm:ss';
            return moment(row.time).format(formatString);

        }
    }
})