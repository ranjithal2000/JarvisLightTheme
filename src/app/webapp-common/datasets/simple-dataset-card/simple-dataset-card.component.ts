import {Component, EventEmitter, Output} from '@angular/core';
import {PipelineCardComponent} from '@common/pipelines/pipeline-card/pipeline-card.component';
import { fileSizeConfigStorage } from '@common/shared/pipes/filesize.pipe';

@Component({
  selector: 'sm-simple-dataset-card',
  templateUrl: './simple-dataset-card.component.html',
  styleUrls: ['./simple-dataset-card.component.scss']
})
export class SimpleDatasetCardComponent extends PipelineCardComponent{
  @Output() addtoPortal=new EventEmitter();
  fileSizeConfigStorage = {...fileSizeConfigStorage, spacer: '', round: 1};
}
