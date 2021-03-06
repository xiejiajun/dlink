package com.dlink.controller;

import com.dlink.common.result.Result;
import com.dlink.dto.StudioDDLDTO;
import com.dlink.dto.StudioExecuteDTO;
import com.dlink.model.Task;
import com.dlink.result.RunResult;
import com.dlink.service.StudioService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * StudioController
 *
 * @author wenmo
 * @since 2021/5/30 11:05
 */
@Slf4j
@RestController
@RequestMapping("/api/studio")
public class StudioController {

    @Autowired
    private StudioService studioService;

    /**
     * 执行Sql
     */
    @PostMapping("/executeSql")
    public Result executeSql(@RequestBody StudioExecuteDTO studioExecuteDTO)  {
        RunResult runResult = studioService.executeSql(studioExecuteDTO);
        return Result.succeed(runResult,"执行成功");
    }

    /**
     * 进行DDL操作
     */
    @PostMapping("/executeDDL")
    public Result executeDDL(@RequestBody StudioDDLDTO studioDDLDTO)  {
        RunResult runResult = studioService.executeDDL(studioDDLDTO);
        return Result.succeed(runResult,"执行成功");
    }

    /**
     * 清除指定session
     */
    @DeleteMapping("/clearSession")
    public Result clearSession(@RequestBody JsonNode para) {
        if (para.size()>0){
            List<String> error = new ArrayList<>();
            for (final JsonNode item : para){
                String session = item.asText();
                if(!studioService.clearSession(session)){
                    error.add(session);
                }
            }
            if(error.size()==0) {
                return Result.succeed("清除成功");
            }else {
                return Result.succeed("清除部分成功，但"+error.toString()+"清除失败，共"+error.size()+"次失败。");
            }
        }else{
            return Result.failed("请选择要清除的记录");
        }
    }
}
