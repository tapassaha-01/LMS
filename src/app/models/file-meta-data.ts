export interface FileMetaData {
      Id?:string;
	
	  entityType?:string; //objectType
	  entityId?:string;  //objId
	  actualFileId?:string;  //fileFsId
	  fileName?:string;  // fileName
	  fileType?:string;  //fileType(pdf., excel)
	 fileSize?:number;  //filesize(total in KB)
	  jsondata?:string; 
}
