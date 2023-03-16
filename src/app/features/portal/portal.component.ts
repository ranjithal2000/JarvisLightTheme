import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SMMaterialModule } from '../../webapp-common/shared/material/material.module'
import {ICONS} from '@common/constants';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
export interface tags {
  name: string;
}
@Component({
  selector: 'sm-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  readonly ICONS = ICONS;
  dataSetId: any;
  abc: any;
  name: any;
  id: any;
  data_name: any;
  version: any;
  desc: any;
  view_url: any;
  run_url: any;
  panelOpenState: boolean;
  ab: any = [];
  selectedApps: any;
  Array: any = [];
  Modules: any = [];
  Dataset: any = [];
  Engin: any = [];
  frontend: any = [];
  Solution: any = [];
  Searchvalue: string = '';
  Searchdata: string = 'datasetName';
  ishidden: boolean = false;
  selectedIndex: number = 0;
  filled: boolean = false;
  tags:tags[]=[{name:'tag1'},{name:'tag2'}];
  drop(event: CdkDragDrop<tags[]>) {
    moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  }
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchData();
    this.getModel();
    this.getSolution();
    this.getdataset();
    this.getPipeline();
  }
  formdata = this.formBuilder.group({
    type: [],
    name: [],
    id: [],
    version: [],
    desc: [],
    url: []
  })
  formdata1 = this.formBuilder.group({
    dataset_name: ['', Validators.required],
    dataset_project: ['', Validators.required],
    dataset_id: [],
    version: [],
    description: []
  })
  formdata2 = this.formBuilder.group({
    project_name: [],
    view_url: [],
    run_url: [],
    model_tags:[],
    desc:[],
  })
  formdata3 = this.formBuilder.group({
    solution_name: [],
    view_url: [],
    solution_tags: [],
    solution_description: [],
    run_url:[]
  })
  formdata4 = this.formBuilder.group({
    name: [],
    version: [],
    desc: [],
    id: [],
    url:[],
    main_id:[]
  })
  // formdata5 = this.formBuilder.group({
  //   id: []
  // })
  formdata6 = this.formBuilder.group({
    project_name: [],
    id: [],
    desc:[],
    view_url:[],
    run_url:[],
    modelTags:[]
  })
  formdata7 = this.formBuilder.group({
    solution_name: [],
    solution_description: [],
    solution_tags: [],
    solution_id:[],
    solution_version:[],
    run_url:[],
    view_url:[]
  })
  formdata8 = this.formBuilder.group({
    pipeline_name:[],
    pipelineView_url:[],
    pipeline_description:[],
    pipeline_tags:[],
    id:[]
  })
  storeResponse: any;
  pipeline:any=[];
  // ------------------------------Modeljar section-------------------------------
  addModel() {
    debugger
    let modelName = this.formdata2.controls['project_name'].value;
    let modelViewUrl = this.formdata2.controls['view_url'].value;
    let modelRunUrl = this.formdata2.controls['run_url'].value;
    let modelTags = this.formdata2.controls['model_tags'].value;
    let modelDescription = this.formdata2.controls['desc'].value;
    this.http.post('http://3.108.153.122:3000/model/insertModel', { modelName, modelViewUrl, modelRunUrl, modelTags, modelDescription })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  editModel() {
    debugger
    let modelName = this.formdata6.controls['project_name'].value;
    let modelId = this.formdata6.controls['id'].value.toString();
    let modelTags = this.formdata6.controls['modelTags'].value;
    let modelDescription = this.formdata6.controls['desc'].value;
    let modelRunUrl = this.formdata6.controls['run_url'].value;
    let modelViewUrl = this.formdata6.controls['view_url'].value;
    this.http.post('http://3.108.153.122:3000/model/editModel', { modelName, modelTags, modelId, modelDescription, modelRunUrl, modelViewUrl })
      .subscribe(response => {
        console.log("res", response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  modelId:any;
  deleteModel() {
    debugger
    let modelId=this.modelId;

    this.http.post('http://3.108.153.122:3000/model/deleteModel', { modelId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  dumbb: any;
  dumbb1: any;
  dumbb2: any;
  getModel() {
    this.http.post('http://3.108.153.122:3000/model/retrieveModels', {})
      .subscribe(response => {
        this.dumbb = response;
        this.Modules = this.dumbb.data;
        console.log(this.Modules);
      }
      )
  }
// ------------------------------dataset section-------------------------------
  addDataset() {
    // debugger
    let datasetName = this.formdata.controls['name'].value;
    let datasetId = this.formdata.controls['id'].value;
    let datasetVersion = this.formdata.controls['version'].value;
    let datasetDescription = this.formdata.controls['desc'].value;
    let datasetUrl = this.formdata.controls['url'].value;
    this.http.post('http://3.108.153.122:3000/data/insertData', {datasetUrl, datasetName, datasetId, datasetVersion, datasetDescription })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        alert(this.storeResponse.message);
        this.getdataset();
      }
      );
  }
  editDataset() {
    let datasetName = this.formdata4.controls['name'].value;
    let datasetVersion = this.formdata4.controls['version'].value;
    let datasetDescription = this.formdata4.controls['desc'].value;
    let datasetUrl = this.formdata4.controls['url'].value;
    let datasetId =this.formdata4.controls['main_id'].value.toString();
    let id = this.formdata4.controls['id'].value.toString();
   

    console.log("datasetId", datasetName, datasetId, datasetVersion, datasetDescription)
    this.http.post('http://3.108.153.122:3000/data/editDataset', { datasetName, datasetId, datasetVersion, datasetDescription, datasetUrl })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  datasetId:any;
  deleteDataset() {
   debugger
    let datasetId=this.datasetId;

    this.http.post('http://3.108.153.122:3000/data/deleteDataset', { datasetId })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  getdataset() {
    this.http.post('http://3.108.153.122:3000/data/retrieveDatasets', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Dataset = this.dumbb1.data;
        console.log("abc", this.Dataset);
      }
      )
  }
// --------------------------------Pipeline Section---------------------------------
  addPipeline(){
    debugger
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.108.153.122:3000/pipeline/insertPipeline', {pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription })
      .subscribe(response => {
        console.log(response)
        this.storeResponse = response;
        alert(this.storeResponse.message);
        this.getPipeline();
      }
      );
  }
  getPipeline(){
    this.http.post('http://3.108.153.122:3000/pipeline/retrievePipelines', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.pipeline = this.dumbb1.data;
        console.log("pipeline", this.pipeline);
        
      }
      )
  }

  editPipeline() {
    debugger
    let pipelineId=this.formdata8.controls['id'].value;
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.108.153.122:3000/pipeline/editPipeline', { pipelineId,pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription})
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getPipeline();
      });
  }

  pipelineId:any;

  deletePipeline(){
    debugger
    // console.log("solutionData", data)
    // this.formdata7.controls['solution_id'].setValue(data.solutionId);
    // let solutionId = this.formdata7.controls['solution_id'].value.toString();
    let pipelineId=this.pipelineId
    this.http.post('http://3.108.153.122:3000/pipeline/deletePipeline', { pipelineId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getPipeline();
      }
      )
  }

  // ------------------------------unknow-------------------------------
  getData(data: any) {
    console.log("clicked", data)
    this.abc = data
    console.log("abcName", this.abc.id)
    this.formdata4.controls['id'].setValue(data.id);
    this.formdata4.controls['name'].setValue(data.datasetName);
    this.formdata4.controls['version'].setValue(data.datasetVersion);
    this.formdata4.controls['desc'].setValue(data.datasetDescription);
    this.formdata4.controls['url'].setValue(data.datasetUrl);
    this.formdata4.controls['main_id'].setValue(data.datasetId)
    this.formdata4.controls['id'].disable();
  }
  getDataModel(data: any) {
    console.log("clicked", data)
    this.formdata6.controls['project_name'].setValue(data.modelName);
    this.formdata6.controls['id'].setValue(data.modelId)
    this.formdata6.controls['desc'].setValue(data.modelDescription);
    this.formdata6.controls['run_url'].setValue(data.modelRunUrl);
    this.formdata6.controls['view_url'].setValue(data.modelViewUrl);
    this.formdata6.controls['modelTags'].setValue(data.modelTags);
  }
  getDataSolution(data:any){
    debugger
    console.log("clickedsolution", data)
    this.formdata7.controls['solution_name'].setValue(data.solutionName)
    // this.formdata7.controls['solution_version'].setValue(data.solutionVersion)
    this.formdata7.controls['solution_id'].setValue(data.solutionId)
    this.formdata7.controls['solution_tags'].setValue(data.solutionTags)
    this.formdata7.controls['solution_description'].setValue(data.solutionDescription)
    this.formdata7.controls['view_url'].setValue(data.solutionViewUrl)
    this.formdata7.controls['run_url'].setValue(data.solutionRunUrl)
  }
  getDataPipeline(data:any){
    this.formdata8.controls['pipeline_name'].setValue(data.pipelineName)
    this.formdata8.controls['pipelineView_url'].setValue(data.pipelineViewUrl)
    this.formdata8.controls['pipeline_tags'].setValue(data.pipelineTags)
    this.formdata8.controls['pipeline_description'].setValue(data.pipelineDescription) 
    this.formdata8.controls['id'].setValue(data.pipelineId) 
  }
// ------------------------------solution jar section-------------------------------
  addSolution() {
    let solutionName = this.formdata3.controls['solution_name'].value;
    let solutionViewUrl = this.formdata3.controls['view_url'].value;
    let solutionRunUrl= this.formdata3.controls['run_url'].value;
    let solutionTags = this.formdata3.controls['solution_tags'].value;
    let solutionDescription = this.formdata3.controls['solution_description'].value;

    this.http.post('http://3.108.153.122:3000/solution/insertSolution', { solutionName, solutionViewUrl, solutionTags, solutionDescription, solutionRunUrl })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getSolution();
      });
  }
  editSolution() {
    let solutionName = this.formdata7.controls['solution_name'].value;
    let solutionId = this.formdata7.controls['solution_id'].value.toString();
    let solutionRunUrl=this.formdata7.controls['run_url'].value;
    let solutionViewUrl=this.formdata7.controls['view_url'].value;
    let solutionTags = this.formdata7.controls['solution_tags'].value;
    let solutionDescription = this.formdata7.controls['solution_description'].value;
    let solutionVersion = this.formdata7.controls['solution_version'].value

    this.http.post('http://3.108.153.122:3000/solution/editSolution', {solutionId, solutionName, solutionTags, solutionDescription, solutionRunUrl, solutionVersion, solutionViewUrl })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getSolution();
      });
  }

  solutionId:any;
  deleteSolution(){
    debugger
    // console.log("solutionData", data)
    // this.formdata7.controls['solution_id'].setValue(data.solutionId);
    // let solutionId = this.formdata7.controls['solution_id'].value.toString();
    let solutionId=this.solutionId;

    this.http.post('http://3.108.153.122:3000/solution/deleteSolution', { solutionId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        alert(this.storeResponse.message)
        this.getSolution();
      }
      )
  }
  getSolution() {
    this.http.post('http://3.108.153.122:3000/solution/retrieveSolutions', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Solution = this.dumbb1.data;
        console.log(this.Solution);
      }
      )
  }
  
  editData(data: any, jar: any) {
    this.SelectJar(jar);
    this.getDataPipeline(data)
    // this.formdata.controls['name'].setValue(data.datasetName);
    // this.formdata.controls['version'].setValue(data.datasetVersion);
    // this.formdata.controls['id'].disable();
    // this.formdata4.controls['id'].disable();
    // this.formdata.controls['desc'].setValue(data.datasetDescription);
  }
  reload() {
    window.location.reload();
  }

  isReadMore = true;
  isReadMore1 = true;
  isReadMore2 = true;
  isReadMore3 = true;
  showText() {
     this.isReadMore = !this.isReadMore;
  }
  showText1(){
    this.isReadMore1 = !this.isReadMore1 
  }
  showText2(){
    this.isReadMore2 = !this.isReadMore2
  }
  showText3(){
    this.isReadMore3 = !this.isReadMore3
  }

  Jars: any = [{ id: 1, name: 'Model' }, { id: 2, name: 'Dataset' }, { id: 3, name: 'Pipeline' }]
  Model: any = [{ id: 1, name: 'Local Copy' }, { id: 2, name: 'Remote Copy' }, { id: 3, name: 'Using Id' }]
  data: any = [];
  store: any = [];
  fetchData() {
    debugger
    this.http.get('https://jarvis-test-336a1-default-rtdb.firebaseio.com/Jars.json')
      .pipe(map((data: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
        const sample = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            sample.push(...data[key])
          }
        }
        return sample;
      }))
      .subscribe(
        (response) => {
          this.data = response
          console.log(this.data);
          this.LoadData(this.data);
        })
  }
  LoadData(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.store = data;
      if (this.store[i].Type == 'Pipeline') {
        this.Engin.push(data[i]);
      } else if (this.store[i].Type == 'Model') {
        // this.Modules.push(data[i]);
      } else if (this.store[i].Type == 'Dataset') {
        // this.Dataset.push(data[i]);
      } else if (this.store[i].Type == 'Solution') {
        // this.Solution.push(data[i])
      }
    }
  }
  copytext() {
    navigator.clipboard.writeText(this.value1);
  }
  copytext1() {
    navigator.clipboard.writeText(this.value2);
  }
  ds: boolean = false;
  mdl: boolean = false;
  sln: boolean = false;
  ppln:boolean=false;
  jar: any;
  SelectJar(jar: any) {
    debugger
    // this.formdata = this.formBuilder.group({
    //   type: [],
    //   name: [],
    //   id: [],
    //   version: [],
    //   desc: [],
    //   url:[]
    // })
    if (jar == 'Dataset') {
      this.ds = true;
      this.mdl = false;
      this.sln = false;
      this.ppln=false;
    } else if (jar == 'Model') {
      this.ds = false;
      this.mdl = true;
      this.sln = false;
      this.ppln=false;
    } else if (jar == 'Solution') {
      this.ds = false;
      this.mdl = false;
      this.sln = true;
      this.ppln=false;
    } else if(jar == 'Pipeline'){
      this.ds = false;
      this.mdl = false;
      this.sln = false;
      this.ppln= true;
    }
  }
  deleteId(data:any,jar:any){
    debugger
    this.SelectJar(jar);

    if(jar == 'Dataset'){
      this.datasetId=data.datasetId;

    }else if(jar == 'Model'){
      this.modelId=data.modelId;

    } else if(jar == 'Solution'){
      this.solutionId=data.solutionId;

    } else if(jar == 'Pipeline'){
      this.pipelineId=data.pipelineId;
    }
  }
  
  value1: any = 'Enter all API_Data to generate the Script';
  new_dataset_name: any = '';
  dataset_id: any = '';
  new_dataset_project_name: any = '';
  DownloadData() {
    if (this.selectedIndex != 3) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
    this.new_dataset_name = this.formdata1.controls['dataset_name'].value;
    this.dataset_id = this.formdata1.controls['dataset_id'].value;
    this.new_dataset_project_name = this.formdata1.controls['dataset_project'].value;
    this.value1 = `
from clearml import Dataset
#Get the dataset using Dataset Id
dataset = Dataset.get("${this.dataset_id}")
#Get the physical location of the dataset
url = dataset._task.artifacts['data'].url
# Create a dataset with ClearML\`s Dataset class
new_dataset = Dataset.create(dataset_name="${this.new_dataset_name}",
                  dataset_project="${this.new_dataset_project_name}") 
#Add the example url                 
new_dataset.add_external_files(source_url=url)
# Upload dataset to ClearML server (customizable)
new_dataset.upload() 
# commit dataset changes
new_dataset.finalize()
  `
  }
  setDataValues(data: any) {
    this.formdata1.controls['dataset_name'].setValue(data.Name);
    this.formdata1.controls['dataset_id'].setValue(data.Id);
  }
  value2: any;
  Model_Proj: any;
  model_Id: any;
  modelcode(data: any) {
    this.Model_Proj = data.Name;
    this.model_Id = data.Id;
    this.value2 =
      `from clearml import Model, Task, Logger
import tensorflow as tf
from tempfile import gettempdir
import os
import numpy as np
import warnings
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
project_config = {
    'PROJECT_NAME' : '${this.Model_Proj}'}
task = Task.init(
    project_name=project_config['PROJECT_NAME'],
    task_name='Model Inference',
    task_type='inference',
    reuse_last_task_id=False
)
logger = task.get_logger()
# print(f'Loading model: af7391e2c0784dbf9e83ba3969aee923')
model = Model('${this.model_Id}')
print(f'\nGetting a local copy of the model : {model.id}\n') 
model_path  = model.get_local_copy()
print(f'model_path= {model_path}')
#Load the model into keras/tf
model = tf.keras.models.load_model(model_path)
print(model.summary())
#Load data to run inference on mnnist test data
(x_train,y_train),(x_test,y_test) = tf.keras.datasets.mnist.load_data()
print(x_train.shape,y_train.shape,x_test.shape,y_test.shape)
#run inference
sample = x_test#[:5,:,:]
for i,img in enumerate(sample):
    pred = model.predict(np.expand_dims(img, axis=0))
    pred = np.argmax(pred, axis=1)
    logger.report_image("image", str(pred), iteration=i, image=img)`
  }
  // value1=`# create example dataset
  // from clearml import StorageManager, Dataset
  // # Download sample csv file
  // csv_file = StorageManager.get_local_copy(
  //     remote_url="https://vincentarelbundock.github.io/Rdatasets/csv/AER/Affairs.csv"
  // )
  // # Create a dataset with ClearML\`s Dataset class
  // dataset = Dataset.create(
  //     dataset_project="DatasetProject", dataset_name="HelloDataset"
  // )
  // # add the example csv
  // dataset.add_files(path=csv_file)
  // # Upload dataset to ClearML server (customizable)
  // dataset.upload()
  // # commit dataset changes
  // dataset.finalize()`;
}