import { Box, Text } from "@radix-ui/themes";
import { FC } from "react";

import { ProgressInfo } from "@/models/progress";

type ProgressMessageProps = {
  info: ProgressInfo;
};

export const ProgressMessage: FC<ProgressMessageProps> = (props) => {
  const { info } = props;

  if (info.status === "initiate") {
    return (
      <Box>
        <Text>
          {/* <Code>{info.name}</Code>から
          <Code>{info.file}</Code>を初期化中 */}
          初期化しています
        </Text>
      </Box>
    );
  }

  if (info.status === "download") {
    return (
      <Box>
        <Text>
          {/* <Code>{info.name}</Code>から
          <Code>{info.file}</Code>をダウンロード中 */}
          ダウンロードしています
        </Text>
      </Box>
    );
  }

  if (info.status === "progress") {
    return (
      <Box>
        <Text>ダウンロードを進行しています</Text>
        {/* <Text>
          <Code>{info.name}</Code>から
          <Code>{info.file}</Code>をダウンロード中
        </Text>

        <Box mt="1">
          <Progress value={info.progress} max={100} />
        </Box> */}
      </Box>
    );
  }

  if (info.status === "done") {
    return (
      <Box>
        <Text>
          ダウンロードが完了しました
          {/* <Code>{info.name}</Code>から
          <Code>{info.file}</Code>をダウンロード完了 */}
        </Text>
      </Box>
    );
  }
};
