import React from "react";

import { Select } from "antd";
import { NoBgButton } from "../../../component";
import { TypedSetState } from "../../../interface/common.interface";
import { useAppSelector } from "../../../hook";

import style from "./Moment-Header.module.scss";
import add from "../../../asset/note.png";

interface IMomentHeaderProps {
   addMomentFn: () => Promise<void>;
   setSearchKey: TypedSetState<string>;
}

export function MomentHeader({ addMomentFn, setSearchKey }: IMomentHeaderProps) {
   const select = (value: string) => setSearchKey(value);

   const { tags } = useAppSelector(state => state.momentReducer);

   return (
      <div className={ style.MomentHeader }>
         {/* Save moment */ }
         <div className={ style.save_moment }>
            <img src={ add } alt={ "add" }/>
            <NoBgButton text={ "Зберегти момент" } hoverSubject={ "moment" } onClick={ () => addMomentFn() }/>
         </div>

         {/* Select */ }
         <div className={ style.select_wrapper }>
            <Select style={ { width: 130 } }
                    allowClear={ true }
                    placeholder="Фільтр"
                    notFoundContent={ "Пусто" }
                    bordered={ false }
                    onChange={ select }
                    options={ tags.map(tag => ({ value: tag, label: tag })) }
                    filterOption={ (input, option) =>
                       (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
            />
         </div>

      </div>
   );
}
