import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { pageSize } from '@common/projects/common-projects.consts';
import {CommonProjectsPageComponent} from '@common/projects/containers/projects-page/common-projects-page.component';
import {isExample} from '@common/shared/utils/shared-utils';
import {trackById} from '@common/shared/utils/forms-track-by';
import {
  addProjectTags,
  getProjectsTags,
  setSelectedProjectId,
  setTags
} from '@common/core/actions/projects.actions';
import {
  selectMainPageTagsFilter,
  selectMainPageTagsFilterMatchMode,
  selectProjectTags
} from '@common/core/reducers/projects.reducer';
import {Observable, Subscription} from 'rxjs';
import {Project} from '~/business-logic/model/projects/project';
import {
  getAllProjectsPageProjects,
  resetProjects,
  showExamplePipelines,
  updateProject
} from '@common/projects/common-projects.actions';
import {ProjectsGetAllResponseSingle} from '~/business-logic/model/projects/projectsGetAllResponseSingle';
import {ConfirmDialogComponent} from '@common/shared/ui-components/overlay/confirm-dialog/confirm-dialog.component';
import {selectShowPipelineExamples} from '@common/projects/common-projects.reducer';
import {combineLatest} from 'rxjs';
import {EntityTypeEnum} from '~/shared/constants/non-common-consts';
import { OutMode } from 'tsparticles-engine';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sm-pipelines-page',
  templateUrl: './pipelines-page.component.html',
  styleUrls: ['./pipelines-page.component.scss']
})
export class PipelinesPageComponent extends CommonProjectsPageComponent implements OnInit, OnDestroy {
  initPipelineCode = `from clearml import PipelineDecorator

@PipelineDecorator.component(cache=True, execution_queue="default")
def step(size: int):
    import numpy as np
    return np.random.random(size=size)

@PipelineDecorator.pipeline(
    name='ingest',
    project='data processing',
    version='0.1'
)
def pipeline_logic(do_stuff: bool):
    if do_stuff:
        return step(size=42)

if __name__ == '__main__':
    # run the pipeline on the current machine, for local debugging
    # for scale-out, comment-out the following line and spin clearml agents
    PipelineDecorator.run_locally()

    pipeline_logic(do_stuff=True)`;

  pageSize = pageSize;
  isExample = isExample;
  trackById = trackById;
  public projectsTags$: Observable<string[]>;
  public showExamples$: Observable<boolean>;

  @ViewChild('emptyStateContent') emptyStateRef: TemplateRef<any>;
  private headerUserFocusSub: Subscription;
  private mainPageFilterSub: Subscription;

  ngOnInit() {
    super.ngOnInit();
    this.showExamples$ = this.store.select(selectShowPipelineExamples);
    this.store.dispatch(getProjectsTags());

    this.projectsTags$ = this.store.select(selectProjectTags);
    this.mainPageFilterSub = combineLatest([this.store.select(selectMainPageTagsFilter), this.store.select(selectMainPageTagsFilterMatchMode)]).subscribe(()=>{
      this.store.dispatch(resetProjects());
      this.store.dispatch(getAllProjectsPageProjects());
    });
  }
  

  ngOnDestroy() {
    super.ngOnDestroy();
    this.headerUserFocusSub?.unsubscribe();
    this.mainPageFilterSub.unsubscribe();
    this.store.dispatch(setTags({tags: []}));
  }
  constructor(store: Store<any>, router: Router, route: ActivatedRoute, dialog: MatDialog,
    protected http:HttpClient){
    super(store, router, route, dialog);

  }
  //------------------------------------------
  // @Output() addtoPortalData=new EventEmitter<any>();

  addtoPortal(project1:Project){
    let project=project1.id;
    console.log("project",project1);
    this.http.post("http://13.234.148.242:3000/clearml/pipeline",{project}).subscribe(response => {   
  })
    // this.addtoPortalData.emit(project);
  }

  addTag(project: Project, newTag: string) {
    const tags = [...project.tags, newTag];
    this.store.dispatch(updateProject({id: project.id, changes: {tags}}));
    this.store.dispatch(addProjectTags({tags: [newTag], systemTags: []}));
  }

  removeTag(project: Project, deleteTag: string) {
    const tags = project.tags?.filter(tag => tag != deleteTag);
    this.store.dispatch(updateProject({id: project.id, changes: {tags}}));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getExtraProjects(selectedProjectId, selectedProject) {
    return [];
  }

  public projectCardClicked(project: ProjectsGetAllResponseSingle) {
    this.router.navigate( [project.id, 'experiments'], {relativeTo: this.route});
    this.store.dispatch(setSelectedProjectId({projectId: project.id, example: isExample(project)}));
  }

  protected getName() {
    return EntityTypeEnum.pipeline;
  }

  protected getDeletePopupEntitiesList() {
    return 'run';
  }

  createPipeline() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'CREATE NEW PIPELINE',
        template: this.emptyStateRef,
        iconClass: 'al-icon al-ico-pipelines al-color blue-300',
        width: 1200
      },
      maxWidth: '95vw'
    });

}

  createExamples() {
    this.store.dispatch(showExamplePipelines());
  }
}
