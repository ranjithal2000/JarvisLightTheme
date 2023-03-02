import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PipelinesPageComponent} from '@common/pipelines/pipelines-page/pipelines-page.component';
import {ProjectsGetAllResponseSingle} from '~/business-logic/model/projects/projectsGetAllResponseSingle';
import {setSelectedProjectId} from '@common/core/actions/projects.actions';
import {ConfirmDialogComponent} from '../../shared/ui-components/overlay/confirm-dialog/confirm-dialog.component';
import {showExampleDatasets} from '../../projects/common-projects.actions';
import {selectShowDatasetExamples} from '../../projects/common-projects.reducer';
import {EntityTypeEnum} from '~/shared/constants/non-common-consts';
// import { FormArray,FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';

@Component({
  selector: 'sm-simple-datasets',
  templateUrl: './simple-datasets.component.html',
  styleUrls: ['./simple-datasets.component.scss']
})
export class SimpleDatasetsComponent extends PipelinesPageComponent implements OnInit {
  @ViewChild('datasetEmptyStateContent') datasetEmptyStateRef: TemplateRef<any>;

 
project:any='default_project_name';
dataset:any='defaul_dataset_name';
project1:any='default_project_name';
dataset1:any='defaul_dataset_name';
Rmturl:any='s3://jarvis-storage/';
lclurl:any='https://vincentarelbundock.github.io/Rdatasets/csv/AER/Affairs.csv';

Remoteurl:any;
Localurl:any;

projectName:any;
datasetName:any;
projectName1:any;
datasetName1:any;
projectName2:any;
datasetName2:any;
// formBuilder: FormBuilder;

// formdata1 = this.formBuilder.group({
//   dataset_name:['',Validators.required],
//   dataset_project:['',Validators.required] ,
//   dataset_id:[],
//   version:[],
//   description:[]
//   }) 

  initDatasetCLICode = `curl -o Affairs.csv https://vincentarelbundock.github.io/Rdatasets/csv/AER/Affairs.csv

clearml-data create --project DatasetProject --name HelloDataset

clearml-data add --files Affairs.csv

clearml-data close`;

  initDatasetSDKCode = `# create example dataset
from clearml import StorageManager, Dataset

# Download sample csv file
csv_file = StorageManager.get_local_copy(
    remote_url="${this.lclurl}"
)

# Create a dataset with ClearML\`s Dataset class
dataset = Dataset.create(
    dataset_project="${this.project}", dataset_name="${this.dataset}"
)

# add the example csv
dataset.add_files(path=csv_file)

# Upload dataset to ClearML server (customizable)
dataset.upload()

# commit dataset changes
dataset.finalize()`;

// --------------new--------------------
initDatasetSDKCodeId = `
from clearml import Dataset

#Replace the below url with your own url

remote_url="${this.Rmturl}"

#Create a dataset with ClearML\`s Dataset class and provide values of your choice

dataset = Dataset.create(dataset_project='${this.project}', 
                         dataset_name='${this.dataset}')

#add the url to the dataset   
                    
dataset.add_external_files(remote_url)

# Upload dataset to ClearML server (customizable)
dataset.upload()

# commit dataset changes
dataset.finalize()`;
// --------------end--------------------
  public emptyStateTab: string = '';


  public projectCardClicked(project: ProjectsGetAllResponseSingle) {
    this.router.navigate(['simple', project.id, 'experiments'], {relativeTo: this.route});
    this.store.dispatch(setSelectedProjectId({projectId: project.id, example: this.isExample(project)}));
  }

  protected getName() {
    return EntityTypeEnum.simpleDataset;
  }

  protected getDeletePopupEntitiesList() {
    return 'version';
  }

  createDataset() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'CREATE NEW DATASET',
        template: this.datasetEmptyStateRef,
        iconClass: 'al-icon al-ico-datasets al-color blue-300',
        width: 1200
      },
      maxWidth: '95vw'
    });
  }

clitab:boolean=false;
sdktab:boolean=false;
sdk1tab:boolean=true;

  emptyStateTabClicked(codeTab: string) {
    this.emptyStateTab = codeTab;

    if(codeTab=='cli'){
      this.clitab=true;
      this.sdk1tab=false;
      this.sdktab=false;
    }else if(codeTab=='sdk'){
      this.sdktab=true;
      this.clitab=false;
      this.sdk1tab=false;
    }else{
      this.sdk1tab=true;
      this.sdktab=false;
      this.clitab=false;
    }
  }
  createExamples() {
    this.store.dispatch(showExampleDatasets());
  }
  ngOnInit() {
    super.ngOnInit();
    this.showExamples$ = this.store.select(selectShowDatasetExamples);

  }

  Generatecode(){
    debugger
    this.Rmturl=this.Remoteurl;
    this.project=this.projectName;
    this.dataset=this.datasetName;
    this.code();
  }
  Generatecode1(){
    this.lclurl=this.Localurl;
    this.project1=this.projectName1;
    this.dataset1=this.datasetName1;
    this.code1();
  }

  code(){

    this.initDatasetCLICode = `curl -o Affairs.csv https://vincentarelbundock.github.io/Rdatasets/csv/AER/Affairs.csv

    clearml-data create --project DatasetProject --name HelloDataset
    
    clearml-data add --files Affairs.csv
    
    clearml-data close`;
    
      this.initDatasetSDKCode = `# create example dataset
    from clearml import StorageManager, Dataset
    
    # Download sample csv file
    csv_file = StorageManager.get_local_copy(
        remote_url="${this.lclurl}"
    )
    
    # Create a dataset with ClearML\`s Dataset class
    dataset = Dataset.create(
        dataset_project="${this.project}", dataset_name="${this.dataset}"
    )
    
    # add the example csv
    dataset.add_files(path=csv_file)
    
    # Upload dataset to ClearML server (customizable)
    dataset.upload()
    
    # commit dataset changes
    dataset.finalize()`;
    
    // --------------new--------------------
    // this.initDatasetSDKCodeId = `
    // from clearml import Dataset
    
    // #Replace the below url with your own url
    
    // remote_url="${this.Rmturl}"
    
    // #Create a dataset with ClearML\`s Dataset class and provide values of your choice
    
    // dataset = Dataset.create(dataset_project='${this.project}', 
    //                          dataset_name='${this.dataset}')
    
    // #add the url to the dataset   
                        
    // dataset.add_external_files(remote_url)
    
    // # Upload dataset to ClearML server (customizable)
    // dataset.upload()
    
    // # commit dataset changes
    // dataset.finalize()`;
  }

  code1(){

    this.initDatasetCLICode = `curl -o Affairs.csv https://vincentarelbundock.github.io/Rdatasets/csv/AER/Affairs.csv

    clearml-data create --project DatasetProject --name HelloDataset
    
    clearml-data add --files Affairs.csv
    
    clearml-data close`;
    
    //   this.initDatasetSDKCode = `# create example dataset
    // from clearml import StorageManager, Dataset
    
    // # Download sample csv file
    // csv_file = StorageManager.get_local_copy(
    //     remote_url="${this.lclurl}"
    // )
    
    // # Create a dataset with ClearML\`s Dataset class
    // dataset = Dataset.create(
    //     dataset_project="${this.project1}", dataset_name="${this.dataset1}"
    // )
    
    // # add the example csv
    // dataset.add_files(path=csv_file)
    
    // # Upload dataset to ClearML server (customizable)
    // dataset.upload()
    
    // # commit dataset changes
    // dataset.finalize()`;
    
    // --------------new--------------------
    this.initDatasetSDKCodeId = `
    from clearml import Dataset
    
    #Replace the below url with your own url
    
    remote_url="${this.Rmturl}"
    
    #Create a dataset with ClearML\`s Dataset class and provide values of your choice
    
    dataset = Dataset.create(dataset_project='${this.project1}', 
                             dataset_name='${this.dataset1}')
    
    #add the url to the dataset   
                        
    dataset.add_external_files(remote_url)
    
    # Upload dataset to ClearML server (customizable)
    dataset.upload()
    
    # commit dataset changes
    dataset.finalize()`;
  }
}
