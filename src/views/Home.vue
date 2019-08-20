<template>
  <div class="home">
    <Layout class="home-layout">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="tabName" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem @click.native="menuSelect('user')" name="user" to="/home/user">
            <Icon type="md-contacts" />
            <span>用户管理</span>
          </MenuItem>
          <MenuItem @click.native="menuSelect('right')" name="right" to="/home/right">
            <Icon type="ios-search"></Icon>
            <span>权限管理</span>
          </MenuItem>
          <MenuItem name="1-4">
            <Icon type="ios-settings"></Icon>
            <span>评论管理</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>轮播管理</span>
          </MenuItem>
          <MenuItem name="1-5">
            <Icon type="ios-settings"></Icon>
            <span>数据统计</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header class="home-header">
          <Row>
            <Col :span="2">
              <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="32"></Icon>
            </Col>
            <Col :span="22">
              <Breadcrumb>
                <BreadcrumbItem >Home</BreadcrumbItem>
                <BreadcrumbItem >user</BreadcrumbItem>
             
              </Breadcrumb>
            </Col>
          </Row>
        </Header>
         <Tabs
          class="home-tabs"
            type="card"
            closable
            v-model="tabName"
            @on-tab-remove="tabRemove"
            @on-click="handelTabs"
          >
            <TabPane
              :name="item.name"
              :label="item.msg"
              v-for="(item,index) in tabsArr"
              :key="item.name"
            ></TabPane>
          </Tabs>
        <Content >
         
          <Card class="home-content" shadow>
               <router-view></router-view>
            </Card>
         
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>

export default {  
  
  data() {
    return {
      isCollapsed: false,
      tabsArr: [{ msg: "用户管理", name: "user", path: "/home/user" }],
      tabName: "user"
    };
  },
  
  computed: {
  
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    handelTabs(path) {
      this.$router.push(this.tabName);
    },
    menuSelect(e) {
     let to = this.$route

       if(to.name=='home'){
        return;
      }
      let aaa = this.tabsArr.filter(value => {
        return value.name == to.name;
      });
      

      if (aaa.length == 0) {
        this.tabsArr.push({ path: to.path, msg: to.meta.msg, name: to.name });
      } else {
      }
      this.tabName = e;
    },
    tabRemove(e) {
    
      let aaa = this.tabsArr.filter(value => {
        return value.name != e;
      });
    
      this.tabsArr = aaa
      if(this.tabsArr.length==0){
        this.$router.push({name:'home'})
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.home-layout {
  height: 100%;
  .home-header {
    background-color: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    .home-icon {
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .home-icon.active {
      transform: rotateZ(-90deg);
      transition: transform 0.3s ease;
    }
  }
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.home-content {
   margin: 20px;
   background: #fff;
   margin-top: -6px;
   height: 97%;
}
.home-tabs {
  margin: 0 20px;
 margin-top: 6px;
}
</style>
