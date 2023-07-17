<template>
  <div style="height: 1000px">
    <div style="float: left; width: 300px">
      <!-- 左侧按钮 -->
      <draggable
        v-model="list1"
        draggable=".c-item"
        v-bind="dragOptions"
        :options="{}"
      >
        <div v-for="d in list1" :key="d.id" class="item c-item">
          {{ d.name }}
        </div>
      </draggable>
    </div>
    <div style="float: right; width: 300px">
      <!-- 右侧按钮 -->
      <draggable
        group="field"
        :list="list3"
        v-bind="dragOptions"
        @change="toChange"
      >
        <div v-for="d in list3" :key="d.id" class="item">{{ d.name }}</div>
      </draggable>
    </div>

    <div class="col-md-3" style="float: left; width: 300px">
        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
          <!-- <transition-group type="transition" :name="'flip-list'"> -->
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li>
          <!-- </transition-group> -->
        </draggable>
      </div>

      <div class="col-md-3" style="float: left; width: 300px">
        <draggable element="span" v-model="list2" v-bind="dragOptions" >
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in list2" :key="element.order">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li>
          </transition-group>
        </draggable>
      </div>
  </div>
</template>

<script>
    import draggable from "vuedraggable";
    
    const message = [
        'vue.draggable',
        'draggable',
        'component',
        'for',
        'vue.js 2.0',
        'based',
        'on',
        'Sortablejs'
    ]

    export default {
        components: {
            draggable,
        },
        data() {
            return {
            // dragOptions: { animation: 500 },
            editable: true,
            list1: [
                { name: "John", id: 1 },
                { name: "Joao", id: 2 },
                { name: "Jean", id: 3 },
                { name: "Gerard", id: 4 },
            ],
            list3: [
                { name: "Juan", id: 5 },
                { name: "Edgard", id: 6 },
                { name: "Johnson", id: 7 },
            ],
            
            list: message.map((name, index) => {
            return { name, order: index + 1, fixed: false };
            }),
            list2: [],
            };
        },
        computed: {
            dragOptions () {
                return {
                animation: 300,
                group: 'description',
                disabled: !this.editable,
                ghostClass: 'ghost'
                };
            }
        },
        methods: {
            toChange(e) {
                console.log(e);
                if (e.added) {
                    console.log(this.list2);
                }
            },
            onMove ({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element
                const draggedElement = draggedContext.element
                return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
                )
            }
        }
    };
</script>