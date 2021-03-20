<script>
export function cloneVNode(vnode) {
  let constructor = vnode.constructor;
  let constructorData = vnode.data.constructor;
  const cloned = new constructor(
    vnode.tag,
    new constructorData({ ...vnode.data, class: 'fade-list-item' }),
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

export default {
  name: 'FadeTransitionGroup',

  render: function (createElement) {
    let newSlots = this.$slots.default.map(function (slot) {
      return cloneVNode(slot);
    });

    return createElement(
      'transition-group',
      {
        class: 'fade-list',
        props: { name: 'fade-list' },
        attrs: this.$attrs,
      },
      newSlots,
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
