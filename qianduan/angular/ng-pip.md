## 管道

> 背景介绍： 这个管道（过滤器）为过滤数据显示下列list数据，替换了之前的tab切换; 
> 这里写分享项目中这个管道，给大家做个借鉴；

> 缺陷： 个人感觉命名有些糟糕 ， 第二次看居然愣神了 

* html 布局页面使用
```html
    <div class="table-responsive">
      <!-- {{ studyProjectList | studyProjectType }} -->
      <app-project-assign-list  [studyProjectList] = "studyProjectList | studyProjectType: typeParams "></app-project-assign-list>
    </div>
```
`app-project-assign-list` 是列表组件

* pip.ts 文件

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { TableType } from './add-student.service';

@Pipe({
  name: 'studyProjectType'
})
export class StudyProjectTypePipe implements PipeTransform {
  transform( allstudyProjects: any[], typeParams: any): any {
    // console.log(typeParams);
    return allstudyProjects.filter(type => typeParams.indexOf(type.type) !== -1);
  }
}
```
> transform 方法是管道的基本要素。 PipeTransform接口中定义了它.
当每个输入值被传给 transform 方法时，还会带上另一个参数

. allstudyProjects 是输入值 ，也就是html 页面中 | 前面的 studyProje。
. typeParams 管道名后的参数  
> 以上这两个为形参，名字自定义，建议命名规范，尤其是写分享管道
. transform 函数里return  是输入数据过滤filter，里面是一个函数 

这里的思路是 对比 请求下的数据 `studyProjectList` 每个列表的type属性  对比下面`typeParams`,  结果为true 就通过过滤显示
```ts
...

public types: TabType[] = [
    {
      name: '课程',
      id: 'courseDate',
      tags: ['在线课', '线上课', '直播课', '线下课'],
    },
    {
      name: '考试',
      id: 'examDate',
      tags: ['试卷'],
    },
    {
      name: '作业',
      id: 'taskDate',
      tags: ['作业'],
    },
    {
      name: '问卷',
      id: 'questionnaireDate',
      tags: ['问卷'],
    },
  ];
  private typeParams: string[] = this.types[0].tags;    //初始值

  ...
  //click 点击事件 改变types[i]
  switchType (i) {
    this.typeParams = this.types[i].tags;
  }
  ...

 /*
 * 数据来源 
 * addStudentService 服务提供 getStudyProject方法
  */
 dataSource: Observable<any>;
  // studyProjectList: Array<any> = [];
   studyProjectList: TableType[] = [];
  constructor(
    private addStudentService: AddStudentService,
  ) {
  }

  ngOnInit() {
    this.dataSource = this.addStudentService.getStudyProject();
    this.dataSource.subscribe(
      (data) => {
        console.log(data);
        this.studyProjectList = data.students;
      }
    );
  }


```
