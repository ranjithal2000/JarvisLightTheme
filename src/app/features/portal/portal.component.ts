import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import {SMMaterialModule} from '../../webapp-common/shared/material/material.module'



@Component({
  selector: 'sm-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  name:any;
  id:any;
  data_name:any;
  version:any;
  desc:any;
  view_url:any;
  run_url:any;
  panelOpenState:boolean;

  ab:any=[];
  selectedApps:any;
  Array:any=[];
  Modules:any=[];
  Dataset:any=[];
  Engin:any=[];
  frontend:any=[];
  Solution:any=[];
  Searchvalue:string='';
  Searchdata:string='datasetName';
  ishidden:boolean=false;
  selectedIndex: number = 0;
  filled:boolean=false;
 
  constructor(private formBuilder: FormBuilder,private http:HttpClient){ }
  
  ngOnInit(): void {
    this.fetchData();
    this.getModel();
    this.getSolution();
    this.getdataset();
  }
  
  formdata = this.formBuilder.group({
          type:[],
          name:[],
          id:[] ,
          version:[],
          desc:[]
          })

  formdata1 = this.formBuilder.group({
    dataset_name:['',Validators.required],
    dataset_project:['',Validators.required] ,
    dataset_id:[],
    version:[],
    description:[]
    }) 
    
    formdata2 = this.formBuilder.group({
      project_name:[],
      view_url:[] ,
      run_url:[],
      }) 
    formdata3 = this.formBuilder.group({
      project_name:[],
      url:[],
      }) 


addModel(){
    debugger
    let modelName=this.formdata2.controls['project_name'].value;
    let modelViewUrl=this.formdata2.controls['view_url'].value;
    let modelRunUrl=this.formdata2.controls['run_url'].value;
    let modelTags='Model';

    this.http.post('http://3.108.153.122:3000/model/insertModel',{modelName,modelViewUrl,modelRunUrl,modelTags})
    .subscribe(response=>
      {
        console.log(response);
      }
    )
  }
dumbb:any;
dumbb1:any;
dumbb2:any;

  getModel(){
    this.http.post('http://3.108.153.122:3000/model/retrieveModels',{})
    .subscribe(response=>
      {
        this.dumbb=response;
        this.Modules=this.dumbb.data;
        console.log(this.Modules); 
      }
    )
  }

  addDataset(){
    debugger
    let datasetName=this.formdata.controls['name'].value;
    let datasetId=this.formdata.controls['id'].value;
    let datasetVersion=this.formdata.controls['version'].value;
    let datasetDescription=this.formdata.controls['desc'].value;
    
    this.http.post('http://3.108.153.122:3000/data/insertData',{datasetName,datasetId,datasetVersion,datasetDescription})
    .subscribe(response =>{console.log(response)}
    );   
    
  }
  getdataset(){
    this.http.post('http://3.108.153.122:3000/data/retrieveDatasets',{})
    .subscribe(response=>
      {
        this.dumbb1=response;
        this.Dataset=this.dumbb1.data;
        console.log(this.Dataset); 
      }
    )
  }

  addSolution(){
    let solutionName=this.formdata3.controls['project_name'].value;
    let solutionViewUrl=this.formdata3.controls['url'].value;
    let solutionRunUrl='runurl';
    let solutionTags='Solution';
    
    this.http.post('http://3.108.153.122:3000/solution/insertSolution',{solutionName,solutionViewUrl,solutionRunUrl,solutionTags})
    .subscribe(response =>{
      console.log(response);
    });   
  }

  getSolution(){
    this.http.post('http://3.108.153.122:3000/solution/retrieveSolutions',{})
    .subscribe(response=>
      {
        this.dumbb1=response;
        this.Solution=this.dumbb1.data;
        console.log(this.Solution); 
      }
    )
  }
  
  

  upload(){
  
    if(this.ds==true){
      debugger
    this.name=this.formdata.controls['type'].value;
    this.data_name=this.formdata.controls['name'].value;
    this.id=this.formdata.controls['id'].value;
    this.version=this.formdata.controls['version'].value;
    this.desc=this.formdata.controls['desc'].value;
    
    this.Array.push({Type:this.name,Name:this.data_name,Id:this.id,Version:this.version,Desc:this.desc});
    
    this.http.post('https://jarvis-test-336a1-default-rtdb.firebaseio.com/Jars.json',this.Array)
    .subscribe(response =>{console.log(response)}
    );   
  }else if(this.mdl==true){

    this.name=this.formdata2.controls['project_name'].value;
    this.id=this.formdata2.controls['view_url'].value;
    this.desc=this.formdata2.controls['run_url'].value;

    this.Array.push({Type:'Model',Name:this.name,Id:this.id,Url:this.desc});
    //Id will be view_url and Url will be run_url
    this.http.post('https://jarvis-test-336a1-default-rtdb.firebaseio.com/Jars.json',this.Array)
    .subscribe(response =>{console.log(response)}
    );   
  }else if(this.sln==true){

    this.name=this.formdata3.controls['project_name'].value;
    this.desc=this.formdata3.controls['url'].value;

    this.Array.push({Type:'Solution',Name:this.name,Id:this.id,Url:this.desc});
    
    this.http.post('https://jarvis-test-336a1-default-rtdb.firebaseio.com/Jars.json',this.Array)
    .subscribe(response =>{console.log(response)}
    );   
  }
    
}

editData(data:any,jar:any){
  
this.SelectJar(jar);
this.formdata.controls['name'].setValue(data.datasetName);
this.formdata.controls['version'].setValue(data.datasetVersion);
this.formdata.controls['id'].disable();
this.formdata.controls['desc'].setValue(data.datasetDescription);
}

  reload(){
    window.location.reload();
  }


  Jars:any=[{id:1,name:'Model'},{id:2,name:'Dataset'},{id:3,name:'Pipeline'}]
  Model:any=[{id:1,name:'Local Copy'},{id:2,name:'Remote Copy'},{id:3,name:'Using Id'}]
  data:any=[];
  store:any=[];

  fetchData(){
    debugger
    this.http.get('https://jarvis-test-336a1-default-rtdb.firebaseio.com/Jars.json')
    .pipe(map((data: { [x: string]: any; hasOwnProperty: (arg0: string) => any; })=>{
      const sample=[];
      for(const key in data){
        if(data.hasOwnProperty(key)){
          sample.push(...data[key])
        }
      }
      return sample ; 
    }))
    .subscribe(
      (response) =>{
        this.data=response
        console.log(this.data);
        
        this.LoadData(this.data);
      })  
  }

  LoadData(data:any){
    for(let i=0;i<data.length;i++ ){
      this.store=data;
      if(this.store[i].Type=='Pipeline'){
        this.Engin.push(data[i]); 
      }else if(this.store[i].Type=='Model'){
        // this.Modules.push(data[i]);
        
      }else if(this.store[i].Type=='Dataset'){
        // this.Dataset.push(data[i]);
        
      }else if(this.store[i].Type=='Solution'){
        // this.Solution.push(data[i])
      }    
    }
  }

copytext(){
  navigator.clipboard.writeText(this.value1);
}
copytext1(){
  navigator.clipboard.writeText(this.value2);
}

ds:boolean=false;
mdl:boolean=false;
sln:boolean=false;
jar:any;

SelectJar(jar:any){
  this.formdata = this.formBuilder.group({
    type:[],
    name:[],
    id:[] ,
    version:[],
    desc:[]
    })


  if(jar=='Dataset'){
    this.ds=true;
    this.mdl=false;
    this.sln=false;
  }else if(jar=='Model'){
    this.ds=false;
    this.mdl=true;
    this.sln=false;
  }else if(jar=='Solution'){
    this.ds=false;
    this.mdl=false;
    this.sln=true;
  }
  }

  value1:any='Enter all API_Data to generate the Script';
  new_dataset_name:any='';
  dataset_id:any='';
  new_dataset_project_name:any='';

DownloadData(){

  if (this.selectedIndex !=3) {
    this.selectedIndex = this.selectedIndex + 1;
  }
  console.log(this.selectedIndex);

  this.new_dataset_name=this.formdata1.controls['dataset_name'].value;
  this.dataset_id=this.formdata1.controls['dataset_id'].value;
  this.new_dataset_project_name=this.formdata1.controls['dataset_project'].value;

this.value1=`
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

  setDataValues(data:any){
    this.formdata1.controls['dataset_name'].setValue(data.Name);
    this.formdata1.controls['dataset_id'].setValue(data.Id);
  }

value2:any;
Model_Proj:any;
model_Id:any;

modelcode(data:any){
this.Model_Proj=data.Name;
this.model_Id=data.Id;

this.value2=
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
