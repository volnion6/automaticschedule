<template>
    <div id="calendar" class="con-main">
        <div class="con-list">
            <!-- 日历 -->
            <el-calendar>
                <!-- 插槽 -->
                <template slot="dateCell" slot-scope="{date, data}">
                    <!--  date   单元格代表的日期  data { type, isSelected, day}，type 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 yyyy-MM-dd-->
                    <div>
                    <!-- 这里加了周六周天的判断 -->
                    <!-- <div :class="(date.getDay()==6 || date.getDay()==0)?'weeked' :'notweeked'">{{data.day}}</div> -->
                    <div :class="(date.getDay()==6 || date.getDay()==0)?'weeked' :'notweeked'">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </div>
                    <!-- 数组循环 -->
                    <div class="cell" v-for="(item,index) in dynamicDags" :key="item.index">
                        <!-- 加数据 -->
                        <div v-if="data.day == item.date">
                            <draggable v-model="dynamicDags[index].users" v-bind="dragOptions" :move="onMove" @end="onDragEnd">
                                <el-tag
                                    :key="tag"
                                    v-for="tag in dynamicDags[index].users"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleCalendarClose(index,tag)"
                                >
                                    <i class="el-icon-info"></i>
                                    {{allUser[tag]}}
                                </el-tag>
                            </draggable>
                        </div>
                    </div>
                    </div>
                </template>
            </el-calendar>
        </div>

        <draggable v-model="userPool"  tag="ul" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <el-tag
                :key="tag"
                v-for="tag in userPool"
                closable
                :disable-transitions="false"
                @close="handleUserPoolClose(tag)"
            >
                {{allUser[tag]}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </draggable>

    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components: {
            draggable
        },
        data () {
            return {
                editable: true,
                isDragging: false,
                allUser: {
                    11: 'name11',
                    12: 'name12',
                    21: 'name21',
                    22: 'name22',
                },
                userPool: [
                    11,
                    12,
                    21,
                    22
                ],
                dynamicTags: ['标签一', '标签二', '标签三'],
                dynamicDags: [
                    {
                    date: '2023-07-14',
                    users: [
                            11,12
                        ]
                    },
                    {
                    date: '2023-07-15',
                    users: [
                            21,22
                        ]
                    }
                ],
                inputVisible: false,
                inputValue: ''
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            handleCalendarClose (index, tag) {
                console.log(parm1);
                console.log(tag);
                this.dynamicDags[index].users.splice(this.dynamicDags[index].users.indexOf(tag), 1);
                this.userPool.push(tag);
            },
            handleUserPoolClose (tag) {
                console.log(tag);
                this.userPool.splice(this.userPool.indexOf(tag), 1);
            },

            showInput () {
                this.inputVisible = true
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm () {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            onMove ({ relatedContext, draggedContext }) {
                
                console.log("---onMove")
                const relatedElementList = relatedContext.list;
                if(relatedElementList.size>1){
                    return false;
                }
                const draggedElement = draggedContext.element
                if(relatedElementList.indexOf(draggedElement)!=-1){
                    return false;
                }
                // return (
                // (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
                // )
            },

            // 方法中  onDragEnd方法在拖拽结束的时候回调打印出顺序,会跟随动作进行重新排序
            onDragEnd () {
                console.log(this.childProject, 'childProject')
            }
        },
        computed: {
            dragOptions () {
                return {
                    animation: 500,
                    group: 'description',
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                };
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue) {
                this.delayedDragging = true
                return
                }
                this.$nextTick(() => {
                this.delayedDragging = false
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .is-selected {
    color: #1989FA;
    }
    div ::v-deep th.gutter {
        display: initial;
    }
    div ::v-deep .el-calendar-day{
        min-height: 110px;
        height: inherit !important;
        position: relative;
        z-index: inherit;
    }
    .notweeked{
        padding: 5px;
        text-align: center;
        background-color: #f1f6fb;
        color: #354158;
    }
    .weeked{
        padding: 5px;
        text-align: center;
        background-color: rgba(255,0,0,.1);
    }

</style>
