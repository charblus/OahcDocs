import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { EditorComponent } from '../../../course-management/shared/editor/editor.component';
import { ModalData, ModalButton } from '../../shared/example-modal/example-modal.component';

import { Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../shared/dynamic-form/models/field-config.interface';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, AfterViewInit {
  private titles: string[] = ['作业管理', '编辑作业'];

  // private taskTypeFlag: boolean = true;
  // private hour: string[] = [];
  // private minute: string[] = [];
  // @ViewChild(EditorComponent) editor: EditorComponent;
  // // @Output()
  // // public clickModal: EventEmitter<ModalData> = new EventEmitter();
  // private modalData: ModalData = new ModalData('设置学分', [
  //   new ModalButton('确定', 'button', 'modal'),
  //   new ModalButton('取消', 'button', 'modal')
  // ], false);
  // private taskModal: ModalData = new ModalData('设置学分', [
  //   new ModalButton('确定', 'button', 'modal'),
  //   new ModalButton('取消', 'button', 'modal')
  // ], false);



  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = [
    {
      type: 'input',
      label: '用户名',
      name: 'name',
      placeholder: '请输入你的用户名',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'textarea',
      label: '问卷说明',
      name: 'legend',
      placeholder: '请输入问卷说明，120字以内',
      validation: [Validators.required, Validators.minLength(120)]
    },
    {
      type: 'select',
      label: '获取学分标准',
      name: 'creditStandards',
      options: ['优秀', '一般', '良好'],
      placeholder: '请设置获取学分标准',
      validation: [Validators.required]
    },
    {
      type: 'typeRadio',
      label: '作业类型',
      name: 'typeRadio',
      options: ['图文', '文档'],
      placeholder: '此类型是指学员提交作业的形式',
      validation: [Validators.required]
    },
    {
      type: 'dutyPeople',
      label: '作业负责人',
      name: 'dutyPeople',
      placeholder: '请输入学员姓名查找',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'selectTwo',
      label: '作业所属类型',
      name: 'selectTwo',
      // options: [
      //   {'IT互联网': ['互联网产品', '互联网营销', '编程语言', '前端开发', '移动开发', '网络与运维', '游戏开发', '软件研发', '云计算大数据', '硬件研发', '人工智能']},
      //   {'职业考试': ['公考求职', '法学院', '财汇金融', '医疗卫生', '建造工程', '人力资源', '心理咨询', '计算机等级', '办公软件', '技工技能', '企业培训', '创业教育']},
      //   {'职业素养': ['领导力', '时间管理', '情绪管理', '阳光心态', '沟通管理', '个人管理', '人际关系', '思维逻辑', '商务礼仪']},
      //   {'职业规划': ['职业发展', '人力规划', '招聘配置', '培训发展', '绩效管理', '薪酬管理', '员工管理', '办公技能', '专业设计', '法律法务', '企业战略', '商业模式']},
      //   {'生活兴趣': ['投资管理', '音乐乐器', '文艺修养', '运动健康', '生活百科', '母婴亲子', '科学文化', '主持表演', '摄影摄像', '健康养生']}
      // ],
      validation: [Validators.required]
    },
    {
      type: 'imgUploda',
      label: '课程封面图片',
      name: 'imgUploda',
      placeholder: '最佳尺寸为450*250像素，支持jpg、png或bmp格式，文件不可超过20MB',
      validation: [Validators.required]
    },
    {
      type: 'deadline',
      label: '提交截止时间',
      name: 'deadline',
      validation: [Validators.required]
    },
    {
      label: '提交',
      name: 'submit',
      type: 'button'
    },
  ];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    console.log('this.form:', this.form);
    setTimeout(() => {
      // this.form.setDisabled('submit', true);
      this.form.setValue('name', 'Todd Motto');
    }, 1);
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }


  constructor() { }

  ngOnInit() {
    // for (let i = 0; i < 25; i++) {
    //   if (i < 10) {
    //     this.hour[i] = '0' + i;
    //   } else {
    //     this.hour[i] = i + '';
    //   }
    // }
    // for (let i = 0; i < 61; i++) {
    //   if (i > 10) {
    //     this.minute[i] = i + '';
    //   } else {
    //     this.minute[i] = '0' + i;
    //   }
    // }
  }

  // taskType(i: number) {
  //   this.taskTypeFlag = i === 0 ? true : false;
  // }
  // onSubmit() {
  //   // let formValue = this.formModel.value;
  //   let topicContent = this.editor.clickHandle();
  //   // if(topicContent === '<p><br></p>') return alert('请输入课程介绍!');
  //   // formValue.topicContent = topicContent;
  //   // console.log(formValue);
  //   console.log(topicContent);
  // }

  // PostData(event): void {
  //   console.log(event);
  // }

  // setUpCreadit() {
  //   this.modalData = this.taskModal;
  // }


  // showPic(event: any) {
  // if (!event.srcElement.files || !event.srcElement.files[0]) return;
  // // if (event.srcElement.files[0].size > 20480) return alert('上传图片不得大于20MB');
  // let thisa = this;
  // var reader = new FileReader();
  // reader.readAsDataURL(event.srcElement.files[0]);
  // reader.onload = function (event: any) {
  //   $('#uplodaImg')[0].src = event.target.result;
  //   $('#uplodaImg')[0].onload = function () {
  //     thisa.imgFlag = true;
  //     let width = $('#uplodaImg')[0].width;
  //     let height = $('#uplodaImg')[0].height;
  //     if (width === 450 && height === 250) return thisa.oldImgSrc = $('#uplodaImg')[0].src;
  //     alert('上传图片尺寸必须为450x250');
  //     $('#uplodaImg')[0].src = thisa.oldImgSrc;
  //     if (thisa.oldImgSrc === "") thisa.imgFlag = false;
  //   }
  // }
  // }


}
