import { OpenAIChatInput, ClientOptions, ChatOpenAI } from '@langchain/openai'
import { IMultiModalOption, IVisionChatModal } from '../../../src'
import { BaseChatModelParams } from '@langchain/core/language_models/chat_models'

export class StackItChatAI extends ChatOpenAI implements IVisionChatModal {
    configuredModel: string
    configuredMaxToken?: number
    multiModalOption: IMultiModalOption
    id: string

    constructor(
        id: string,
        fields?: Partial<OpenAIChatInput> &
            BaseChatModelParams & {
                configuration?: ClientOptions
            }
    ) {
        super(fields)
        this.id = id
        this.configuredModel = fields?.modelName ?? ''
        this.configuredMaxToken = fields?.maxTokens
    }

    revertToOriginalModel(): void {
        this.modelName = this.configuredModel
        this.maxTokens = this.configuredMaxToken
    }

    setMultiModalOption(multiModalOption: IMultiModalOption): void {
        this.multiModalOption = multiModalOption
    }

    setVisionModel(): void {
        // pass
    }
}
